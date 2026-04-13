# HCM Mirai - Website Hệ thống Giáo dục & Tuyển dụng

Chào mừng bạn đến với dự án **HCM Mirai**, một nền tảng website hiện đại được xây dựng để cung cấp thông tin về giáo dục, tin tức và các cơ hội việc làm.

## 🚀 Giới thiệu dự án

HCM Mirai là website đa ngôn ngữ chuyên nghiệp dành cho hệ thống giáo dục và cung ứng nhân lực. Dự án chú trọng vào trải nghiệm người dùng mượt mà, giao diện premium và khả năng quản lý nội dung mạnh mẽ.

### Các công nghệ chủ chốt:

- **Frontend:** Next.js 16+ (App Router), TypeScript
- **Styling:** Tailwind CSS, Shadcn UI, Framer Motion
- **State Management:** Zustand
- **Xác thực:** Custom Auth với cơ chế Refresh Token (Silent Refresh)
- **Đa ngôn ngữ:** `next-intl` (Hỗ trợ tiếng Việt và tiếng Anh)
- **Data Fetching:** Axios & TanStack Query
- **Database:** MongoDB (Mongoose)

---

## 🛠 Hướng dẫn Setup

### 1. Yêu cầu hệ thống

- **Node.js:** Phiên bản 24.x trở lên
- **Package Manager:** `pnpm` (Khuyến nghị)

### 2. Cài đặt các gói phụ thuộc

```bash
pnpm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env.local` tại thư mục gốc và cấu hình các thông số sau:

```env
# API và Server
NEXT_PUBLIC_API_URL=
MONGODB_URI=

# JWT Secret (nếu dùng local auth)
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### 4. Chạy dự án ở chế độ Development

```bash
pnpm dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

---

## 📂 Cấu trúc thư mục dự án

```text
hcm-mirai/
├── messages/               # Các tệp dịch thuật (vi.json, en.json)
├── public/                 # Tài nguyên tĩnh (images, icons, fonts)
├── docs/                   # Tài liệu hướng dẫn kỹ thuật
├── src/
│   ├── app/                # Next.js Routes, Pages & Layouts
│   ├── components/         # Các Component UI dùng chung và Business Component
│   │   ├── features/       # Component theo tính năng (news, orders, admin...)
│   │   └── ui/             # Shadcn UI components
│   ├── constants/          # Các hằng số định nghĩa trong hệ thống
│   ├── hooks/              # Custom React Hooks
│   ├── i18n/               # Cấu hình đa ngôn ngữ (next-intl)
│   ├── lib/                # Cấu hình thư viện (Axios, Mongoose, Auth...)
│   ├── models/             # Định nghĩa Mongoose schemas
│   ├── providers/          # React Context Providers (Query, Theme...)
│   ├── schemas/            # Zod Validation schemas
│   ├── services/           # Logic gọi API (Services layer)
│   ├── store/              # Global state management (Zustand)
│   ├── types/              # Định nghĩa kiểu dữ liệu TypeScript
│   └── utils/              # Các hàm tiện ích dùng chung
├── .agents/                # Cấu hình AI Assistant & Skills
├── next.config.ts          # Cấu hình Next.js
└── tailwind.config.ts      # Cấu hình Tailwind CSS
```

---

## 📖 Tài liệu hướng dẫn

- [Cơ chế Refresh Token](./docs/AUTH_MECHANISM.md)
- [Quy tắc phát triển (CLAUDE.md)](./CLAUDE.md)

---

## 📄 Bản quyền

Dự án được phát triển bởi đội ngũ HCM Mirai.
