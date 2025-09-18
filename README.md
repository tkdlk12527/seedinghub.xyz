# SeedingHub.vn Deals

Chào mừng bạn đến với dự án SeedingHub.vn Deals. Đây là một ứng dụng web được xây dựng để quản lý và hiển thị các ưu đãi (deals).

## 🚀 Bắt đầu nhanh

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau.

### 1. Sao chép (Clone) Repository

```bash
git clone [URL_CUA_REPOSITORY]
cd [TEN_THU_MUC_DU_AN]
```

### 2. Cài đặt Biến môi trường

Ứng dụng này cần kết nối đến Supabase, vì vậy bạn cần cung cấp khóa (key) và URL của Supabase.

Tạo một tệp mới có tên là `.env.local` trong thư mục gốc của dự án và thêm nội dung sau:

```
NEXT_PUBLIC_SUPABASE_URL=URL_SUPABASE_CUA_BAN
NEXT_PUBLIC_SUPABASE_ANON_KEY=ANON_KEY_SUPABASE_CUA_BAN
```

Hãy thay thế các giá trị trên bằng thông tin Supabase của bạn.

### 3. Cài đặt Dependencies

Dự án này sử dụng `pnpm` để quản lý các gói. Chạy lệnh sau để cài đặt:

```bash
pnpm install
```

**Lưu ý:** Lệnh này là một lệnh tiêu chuẩn. Nếu dự án của bạn có lệnh cài đặt khác, vui lòng cập nhật tài liệu này.

### 4. Chạy Development Server

Bây giờ, bạn có thể khởi động server để phát triển:

```bash
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem ứng dụng.

## 🛠️ Công nghệ sử dụng

Dự án này được xây dựng bằng các công nghệ hiện đại:

- **Framework**: [Next.js](https://nextjs.org/) (sử dụng App Router)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Backend & Database**: [Supabase](https://supabase.io/)

## 📂 Cấu trúc dự án

Dưới đây là mô tả ngắn về các thư mục quan trọng:

- **/app**: Chứa tất cả các trang và các tuyến đường (routes) của ứng dụng. Logic chính của giao diện người dùng nằm ở đây.
- **/components**: Chứa các thành phần React, đặc biệt là các thành phần UI từ `shadcn/ui`.
- **/lib**: Chứa các hàm và tiện ích dùng chung, ví dụ như `utils.ts` và file khởi tạo client cho Supabase (`supabase.ts`).
- **/public**: Chứa các tệp tĩnh như hình ảnh, logo, và fonts.