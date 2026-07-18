# Cách thêm Deal mới

Mỗi deal là một file `.json` riêng trong thư mục này.

## Cấu trúc file

Tên file: `{deal_id}.json` (ví dụ: `3.json`, `4.json`, ...)

```json
{
  "deal_id": "3",
  "Content": "Nội dung mô tả deal seeding...",
  "displayedViews": 0,
  "Link Facebook": "https://www.facebook.com/...",
  "created_at": "2026-07-16T10:00:00.000Z"
}
```

## Các trường

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `deal_id` | string | ID duy nhất của deal (phải khớp với tên file) |
| `Content` | string | Nội dung mô tả deal (hỗ trợ xuống dòng `\n`) |
| `displayedViews` | number | Số lượt liên hệ ban đầu (hiển thị như giá trị gốc) |
| `Link Facebook` | string | Link Facebook của seller |
| `created_at` | string | Thời gian tạo deal (ISO 8601, múi giờ UTC) |

## Lưu ý

- `deal_id` phải là duy nhất trong tất cả các file
- Deals được sắp xếp theo `created_at` từ mới nhất đến cũ nhất
- Sau khi thêm file mới, cần **restart server** (hoặc redeploy) để áp dụng
