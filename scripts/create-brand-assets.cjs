const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const source = "C:/Users/user/Downloads/ChatGPT Image 2026년 5월 21일 오후 11_59_21.png";
const outDir = path.join(__dirname, "..", "public");

fs.mkdirSync(outDir, { recursive: true });

async function main() {
  await sharp(source)
    .resize(1200, 630, { fit: "cover", position: "center" })
    .png()
    .toFile(path.join(outDir, "og-image.png"));

  await sharp(source)
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, "favicon.png"));

  await sharp(source)
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, "apple-touch-icon.png"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
