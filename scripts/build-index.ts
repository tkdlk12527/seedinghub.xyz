/**
 * Build-time script: tạo data/deals-index.json từ tất cả file trong data/deals/
 * Chạy tự động trước `pnpm build` và `pnpm dev` qua prebuild/predev scripts
 */
import fs from "fs"
import path from "path"

const DEALS_DIR = path.join(process.cwd(), "src", "data", "deals")
const INDEX_FILE = path.join(process.cwd(), "src", "data", "deals-index.json")

if (!fs.existsSync(DEALS_DIR)) {
  console.error(`✗ DEALS_DIR does not exist at ${DEALS_DIR}`)
  process.exit(1)
}

const files = fs
  .readdirSync(DEALS_DIR)
  .filter((f) => f.endsWith(".json") && f !== "deals-index.json")

const deals = files.flatMap((f) => {
  const filePath = path.join(DEALS_DIR, f)
  try {
    const raw = fs.readFileSync(filePath, "utf-8")
    return [JSON.parse(raw)]
  } catch (e) {
    console.error(`✗ Skipping malformed file: ${f} — ${(e as Error).message}`)
    return []
  }
})

// Sắp xếp từ mới nhất đến cũ nhất
deals.sort(
  (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
)

fs.writeFileSync(INDEX_FILE, JSON.stringify(deals, null, 2), "utf-8")
console.log(`✓ Built deals index: ${deals.length} deals → src/data/deals-index.json`)
