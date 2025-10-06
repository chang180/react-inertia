# Laravel + Inertia + React 專案

一個基於 Laravel 12、Inertia v2 和 React v19 的現代化全端應用程式專案。

## 🚀 技術棧

- **後端**: Laravel 12, PHP 8.4.12
- **前端**: React 19, Inertia v2
- **樣式**: Tailwind CSS v4
- **測試**: Pest v4, PHPUnit v12
- **程式碼品質**: Laravel Pint, ESLint, Prettier

## 📋 專案特色

- 現代化的 Laravel 12 架構
- Inertia v2 無縫前後端整合
- React 19 最新特性支援
- Tailwind CSS v4 響應式設計
- 完整的測試覆蓋率
- Laravel Boost 最佳實踐

## 🎯 當前專案目標

正在整合 [React the Laravel Way](https://laracasts.com/series/react-the-laravel-way) 課程內容，將原生 React 專案轉換為 Laravel + Inertia 架構。

### 整合計畫
- **第一階段**: 準備工作 - 分析原專案結構
- **第二階段**: 選擇性轉換 - 重構組件和狀態管理
- **第三階段**: 整合與優化 - Laravel 後端整合和測試

詳細計畫請參考 [`.ai-dev/project-plan.md`](.ai-dev/project-plan.md)

## 🔧 開發環境設定

```bash
# 安裝 PHP 依賴
composer install

# 安裝前端依賴
npm install

# 環境設定
cp .env.example .env
php artisan key:generate

# 資料庫設定
php artisan migrate

# 啟動開發伺服器
composer run dev
# 或分別啟動
php artisan serve
npm run dev
```

## 🧪 測試

```bash
# 執行所有測試
php artisan test

# 執行特定測試
php artisan test --filter=TestName

# 程式碼格式化
vendor/bin/pint --dirty
```

## 📚 學習資源

- [Laravel 12 文件](https://laravel.com/docs/12.x)
- [Inertia v2 文件](https://inertiajs.com/)
- [React 19 文件](https://react.dev/)
- [Tailwind CSS v4 文件](https://tailwindcss.com/)

## 📁 專案結構

```
├── .ai-dev/              # 專案管理文件
│   ├── project-plan.md   # 詳細專案計畫
│   └── scratch/          # 開發筆記
├── app/                  # Laravel 應用程式
├── resources/
│   ├── js/
│   │   └── Pages/        # Inertia React 頁面
│   └── css/              # 樣式檔案
├── tests/                # 測試檔案
└── reference/            # 參考專案 (待建立)
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案。

## 📄 授權

此專案採用 MIT 授權條款。