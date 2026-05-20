import fs from "node:fs";
import path from "node:path";

const SERVICE_KEY = "d8c4e9bd3f23579924fc68f8354bb77452ffe6850a0fa85bef1285f7cd7b7687";
const API_BASE = "https://apis.data.go.kr/B553917/GyShopService2/selectBroadCastInfo2";
const outDir = path.resolve(import.meta.dirname, "..", "tmp-update");

const columns = [
  "date", "start_time", "end_time", "runtime", "item_code", "name", "main", "priority",
  "img", "img_list", "url", "detail_url", "m_url", "m_detail_url", "shopping_host",
  "event_type", "event_period", "orgin_price", "price", "discount_rate", "free_shipping",
  "cards", "month", "category1", "category2", "category3", "category4", "soldout",
  "is_sale", "is_live_sale", "live_product"
];

function kstDate(offset = 0) {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  kst.setUTCDate(kst.getUTCDate() + offset);
  return `${kst.getUTCFullYear()}${String(kst.getUTCMonth() + 1).padStart(2, "0")}${String(kst.getUTCDate()).padStart(2, "0")}`;
}

function sqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  if (typeof value === "boolean") return value ? "1" : "0";
  return `'${String(value).replaceAll("'", "''")}'`;
}

async function fetchDate(date) {
  const url = `${API_BASE}?ServiceKey=${SERVICE_KEY}&numOfRows=100&pageNo=1&date=${date}&_type=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${date} HTTP ${response.status}`);
  const json = await response.json();
  const body = json?.response?.body;
  const rawItems = body?.item ? (Array.isArray(body.item) ? body.item : [body.item]) : [];
  const liveProduct = body?.live_product || "";
  return rawItems.map((item) => ({
    date,
    start_time: item.start_time || "",
    end_time: item.end_time || "",
    runtime: Number(item.runtime || 0),
    item_code: item.item_code || "",
    name: item.name || "",
    main: item.main ? 1 : 0,
    priority: Number(item.priority || 0),
    img: item.img || "",
    img_list: JSON.stringify(item.img_list || []),
    url: item.url || "",
    detail_url: item.detail_url || "",
    m_url: item.m_url || "",
    m_detail_url: item.m_detail_url || "",
    shopping_host: JSON.stringify(item.shopping_host || []),
    event_type: item.event_type || "",
    event_period: item.event_period || "",
    orgin_price: Number(item.orgin_price || 0),
    price: Number(item.price || 0),
    discount_rate: Number(item.discount_rate || 0),
    free_shipping: item.free_shipping ? 1 : 0,
    cards: JSON.stringify(item.cards || []),
    month: Number(item.month || 0),
    category1: item.category1 || "",
    category2: item.category2 || "",
    category3: item.category3 || "",
    category4: item.category4 || "",
    soldout: item.soldout ? 1 : 0,
    is_sale: item.is_sale ? 1 : 0,
    is_live_sale: item.is_live_sale ? 1 : 0,
    live_product: liveProduct
  }));
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const today = kstDate(0);
const rows = [];
for (let i = 0; i < 10; i += 1) {
  const date = kstDate(i);
  const fetched = await fetchDate(date);
  console.log(`${date}: ${fetched.length}`);
  rows.push(...fetched);
}

const chunkSize = 35;
for (let start = 0; start < rows.length; start += chunkSize) {
  const index = String(start / chunkSize + 1).padStart(3, "0");
  const file = path.join(outDir, `update_${index}.sql`);
  const lines = [];
  if (start === 0) lines.push(`DELETE FROM schedule WHERE date < '${today}';`);
  for (const row of rows.slice(start, start + chunkSize)) {
    const values = columns.map((key) => sqlValue(row[key]));
    lines.push(`INSERT OR REPLACE INTO schedule (${columns.join(",")}) VALUES (${values.join(",")});`);
  }
  fs.writeFileSync(file, lines.join("\n"), "utf8");
}

console.log(`Wrote ${rows.length} rows into ${Math.ceil(rows.length / chunkSize)} files`);
