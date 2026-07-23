# Cách thêm Deal mới

Mỗi deal là một file `.json` riêng trong thư mục này.

## Cấu trúc file

Tên file: `{deal_id}.json` (ví dụ: `3.json`, `4.json`, ...)

```json
{
  "id": 3,
  "messenger_id": "https://m.me/...",
  "profilePic": "https://scontent-iad3-1.xx.fbcdn.net/...",
  "text": "Nội dung mô tả deal seeding...",
  "url": "https://www.facebook.com/...",
  "time": "2026-07-16T10:00:00.000Z"
}
```

## Các trường

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `id` | number | ID duy nhất của deal (phải khớp với tên file dạng số) |
| `messenger_id` | string | Đường dẫn chat Messenger (tùy chọn) |
| `profilePic` | string | URL ảnh đại diện của seller (tùy chọn) |
| `text` | string | Nội dung mô tả deal (hỗ trợ xuống dòng `\n`) |
| `url` | string | Đường dẫn bài đăng/facebook của seller |
| `time` | string | Thời gian tạo deal (ISO 8601, múi giờ UTC) |

## Lưu ý

- `id` phải là duy nhất trong tất cả các file
- Deals được sắp xếp theo `time` từ mới nhất đến cũ nhất
- Sau khi thêm file mới, cần **restart server** (hoặc redeploy) để áp dụng
