import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const input = path.join(root, "wp-gongyoung-shopping", "gongyoung-shopping", "data", "schedule.json");
const migrationDir = path.resolve(import.meta.dirname, "..", "migrations");
const rows = JSON.parse(fs.readFileSync(input, "utf8"));

const columns = [
  "date", "start_time", "end_time", "runtime", "item_code", "name", "main", "priority",
  "img", "img_list", "url", "detail_url", "m_url", "m_detail_url", "shopping_host",
  "event_type", "event_period", "orgin_price", "price", "discount_rate", "free_shipping",
  "cards", "month", "category1", "category2", "category3", "category4", "soldout",
  "is_sale", "is_live_sale", "live_product"
];

function sqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "0";
  if (typeof value === "boolean") return value ? "1" : "0";
  return `'${String(value).replaceAll("'", "''")}'`;
}

for (const file of fs.readdirSync(migrationDir)) {
  if (/^0002_seed_schedule(_\d+)?\.sql$/.test(file)) {
    fs.unlinkSync(path.join(migrationDir, file));
  }
}

const chunkSize = 40;
for (let chunkStart = 0; chunkStart < rows.length; chunkStart += chunkSize) {
  const chunk = rows.slice(chunkStart, chunkStart + chunkSize);
  const index = String(chunkStart / chunkSize + 1).padStart(3, "0");
  const output = path.join(migrationDir, `0002_seed_schedule_${index}.sql`);
  const lines = [];
  if (chunkStart === 0) lines.push("DELETE FROM schedule;");
  for (const row of chunk) {
    const values = columns.map((key) => sqlValue(row[key]));
    lines.push(`INSERT OR REPLACE INTO schedule (${columns.join(",")}) VALUES (${values.join(",")});`);
  }
  fs.writeFileSync(output, lines.join("\n"), "utf8");
}
console.log(`Wrote ${rows.length} rows into ${Math.ceil(rows.length / chunkSize)} seed migration files`);
