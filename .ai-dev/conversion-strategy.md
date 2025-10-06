# 轉換策略與優先順序

## 📊 轉換複雜度評估

### 🟢 低複雜度 (直接轉換)
- **UI 組件**: Header, Container, PageWrapper
- **基本展示**: 圖片卡片、搜尋輸入框
- **樣式系統**: Tailwind CSS 類別可直接使用

### 🟡 中複雜度 (需要調整)
- **狀態管理**: 從 useState 轉為 Inertia page props
- **表單處理**: 從自定義表單轉為 Inertia Form 組件
- **搜尋功能**: 從客戶端過濾轉為伺服器端搜尋

### 🔴 高複雜度 (需要重構)
- **API 整合**: 從 fetch 轉為 Laravel 後端
- **檔案上傳**: 整合 Laravel 檔案處理
- **分頁功能**: 改用 Laravel 分頁或 Inertia 內建功能
- **錯誤處理**: 改用 Laravel 錯誤處理機制

## 🎯 轉換優先順序

### 第一階段：基礎組件轉換
1. **Header 組件** - 頁面標題
2. **Container 組件** - 佈局容器
3. **圖片卡片組件** - 基本展示功能
4. **搜尋輸入組件** - UI 部分

### 第二階段：功能組件轉換
1. **圖片列表組件** - 展示邏輯
2. **收藏功能組件** - LikeToggle
3. **搜尋過濾功能** - 基本搜尋
4. **收藏清單組件** - Shortlist

### 第三階段：複雜功能整合
1. **表單組件** - NewImageForm 轉換
2. **檔案上傳功能** - Laravel 整合
3. **API 資料流** - 伺服器端狀態管理
4. **分頁功能** - Laravel 分頁

### 第四階段：優化與測試
1. **錯誤處理優化** - Laravel 錯誤處理
2. **效能優化** - 減少不必要的重渲染
3. **測試編寫** - Pest 測試覆蓋
4. **文件更新** - 使用說明

## 🔄 狀態管理轉換策略

### 現有狀態結構
```typescript
// 客戶端狀態
const [searchQuery, setSearchQuery] = useState<string>("");
const [images, setImages] = useState<Image[]>(apiImages);
```

### 轉換後的狀態結構
```typescript
// 伺服器端狀態 (透過 Inertia page props)
interface PageProps {
  images: Image[];
  searchQuery?: string;
  filters?: {
    vibe?: string;
    liked?: boolean;
  };
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
```

### 狀態管理決策
- **簡單 UI 狀態**: 保留 useState (如載入狀態、展開/收合)
- **資料狀態**: 改用 Inertia page props
- **表單狀態**: 改用 Inertia Form 組件
- **全域狀態**: 避免 Context，改用 page props

## 🌐 API 整合策略

### 現有 API 呼叫
```typescript
// 獲取圖片
const response = await fetch("https://react-backend.chang180backend.com/api/images");

// 切換收藏
const response = await fetch(`https://react-backend.chang180backend.com/api/images/${id}/like`, {
  method: "PATCH"
});

// 上傳圖片
const response = await fetch("https://react-backend.chang180backend.com/api/images", {
  method: "POST",
  body: formData
});
```

### 轉換後的 Laravel 路由
```php
// routes/web.php
Route::get('/images', [ImageController::class, 'index'])->name('images.index');
Route::patch('/images/{image}/like', [ImageController::class, 'toggleLike'])->name('images.like');
Route::post('/images', [ImageController::class, 'store'])->name('images.store');
```

### Inertia 頁面組件
```typescript
// 使用 Inertia 導航和表單
import { router } from '@inertiajs/react';
import { Form } from '@inertiajs/react';

// 搜尋
router.get('/images', { search: searchQuery });

// 表單提交
<Form action="/images" method="post" encType="multipart/form-data">
```

## 📝 組件轉換清單

### 可直接轉換的組件
- [x] **Header.tsx** - 只需調整樣式類別
- [x] **Container.tsx** - 可直接使用
- [x] **PageWrapper.tsx** - 可直接使用
- [x] **SubmitButton.tsx** - 可直接使用

### 需要調整的組件
- [ ] **ImageList.tsx** - 移除分頁邏輯，改用 Laravel 分頁
- [ ] **Search.tsx** - 改用 Inertia 導航
- [ ] **LikeToggle.tsx** - 改用 Inertia 表單提交
- [ ] **Shortlist.tsx** - 改用伺服器端狀態

### 需要重構的組件
- [ ] **NewImageForm.tsx** - 改用 Inertia Form 組件
- [ ] **Main** (main.tsx) - 重構狀態管理
- [ ] **App.tsx** - 簡化錯誤處理

## 🎨 樣式轉換策略

### 保留的樣式
- Tailwind CSS 類別可直接使用
- 響應式設計 (sm:, md:, lg:)
- 顏色系統 (cyan-* 系列)
- 間距和佈局

### 需要調整的樣式
- 移除自定義 CSS (如果有)
- 確保與現有設計系統一致
- 檢查暗色模式支援

## 🧪 測試策略

### 單元測試
- 組件渲染測試
- 使用者互動測試
- 表單驗證測試

### 功能測試
- 圖片展示功能
- 搜尋功能
- 收藏功能
- 檔案上傳功能

### 整合測試
- Laravel 路由測試
- Inertia 頁面測試
- API 端點測試

## 📋 實作檢查清單

### 第一階段檢查清單
- [ ] 建立 Laravel 路由
- [ ] 建立 ImageController
- [ ] 建立 Image 模型和遷移
- [ ] 轉換基礎 UI 組件

### 第二階段檢查清單
- [ ] 實作圖片列表功能
- [ ] 實作搜尋功能
- [ ] 實作收藏功能
- [ ] 測試基本功能

### 第三階段檢查清單
- [ ] 實作檔案上傳功能
- [ ] 整合 Laravel 驗證
- [ ] 實作分頁功能
- [ ] 優化效能

### 第四階段檢查清單
- [ ] 編寫完整測試
- [ ] 優化錯誤處理
- [ ] 更新文件
- [ ] 程式碼審查

## 🚀 下一步行動

1. **開始第一階段**: 建立 Laravel 後端基礎結構
2. **轉換基礎組件**: Header, Container, 圖片卡片
3. **測試基本功能**: 確保圖片展示正常
4. **逐步添加功能**: 搜尋、收藏、上傳

這個轉換策略確保我們能夠系統性地將 React 專案轉換為 Laravel + Inertia 架構，同時保持功能的完整性和使用者體驗。
