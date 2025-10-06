# 專案整合討論

## 背景
- 原專案：https://github.com/chang180/follow-react-laracasts.git
- 課程：https://laracasts.com/series/react-the-laravel-way
- 目標：將原生 React 專案整合到現有的 Laravel + Inertia 架構中

## 專案現況分析
**原專案詳細資訊**：[follow-react-laracasts](https://github.com/chang180/follow-react-laracasts.git)
- **技術棧**：React 18+, TypeScript (54.4%), HTML (42.8%), JavaScript (2.6%), CSS (0.2%)
- **學習重點**：React 基礎、狀態管理、副作用處理、性能優化、路由實現、表單處理、API 整合
- **特色功能**：響應式設計、組件化架構、現代化 UI/UX 設計

### 整合策略調整：
1. **參考專案處理**：將原專案拉入 `reference/` 目錄作為轉換參考
2. **狀態管理優化**：避免多層參數傳遞，採用最適合的狀態管理方式
3. **選擇性轉換**：只轉換需要的功能，部分功能可能需要重構
4. **樣式統一**：使用現有 start-kit 的樣式系統

## 整合策略

### 1. Welcome Page 展示原課程內容
- 將原課程的 React 組件和功能移植到 Laravel 的 Welcome 頁面
- 保持原有的 UI/UX 設計，但不破壞目前專案已有的結構，必要時調整原有設計
- 使用 Inertia + React 重新實作

### 2. 架構考量
- **前端**：使用 Inertia v2 + React v19
- **樣式**：Tailwind CSS v4
- **狀態管理**：利用 Inertia 的狀態管理功能
- **路由**：Laravel 路由 + Inertia 導航

### 3. 實作步驟建議

#### 階段一：環境準備
- [ ] 分析原專案的組件結構
- [ ] 識別需要移植的核心功能
- [ ] 規劃組件架構

#### 階段二：基礎組件移植
- [ ] 建立對應的 Inertia 頁面組件
- [ ] 移植樣式和 UI 組件
- [ ] 實作基礎路由

#### 階段三：功能整合
- [ ] 整合狀態管理
- [ ] 實作表單處理（使用 Inertia Form 組件）
- [ ] 測試功能完整性

#### 階段四：優化與測試
- [ ] 使用 Pest v4 編寫測試
- [ ] 優化效能
- [ ] 確保響應式設計

### 4. 技術重點
- 遵循 Laravel Boost 指南
- 使用 Inertia v2 的新功能（polling, prefetching, deferred props）
- 確保與現有 Laravel 架構的相容性

### 5. 具體實作建議

#### 針對普通 React 專案的整合方法：

1. **組件移植策略**：
   - 保留原有的 React 組件結構
   - 移除 React Router 相關程式碼
   - 將 API 呼叫改為 Inertia 的資料傳遞

2. **狀態管理轉換**：
   - 將 `useState` 改為伺服器端狀態管理
   - 使用 Inertia 的 `usePage()` 來存取 props
   - 表單處理改用 Inertia 的 `<Form>` 組件

3. **路由重構**：
   - 移除 `react-router-dom` 依賴
   - 使用 Inertia 的 `<Link>` 組件進行導航
   - 在 Laravel 端建立對應的路由

### 6. 具體實作步驟

#### 第一階段：準備工作
1. **拉取參考專案**：
   ```bash
   # 在專案根目錄建立 reference 資料夾
   mkdir reference
   cd reference
   git clone https://github.com/chang180/follow-react-laracasts.git
   ```

2. **分析原專案結構**：
   - 檢查 `src/` 目錄下的組件結構
   - 識別主要的狀態管理方式（useState、useReducer、Context API）
   - 分析路由配置和 API 呼叫

#### 第二階段：選擇性轉換
1. **識別核心功能**：
   - 篩選適合在 Welcome 頁面展示的功能
   - 評估哪些組件可以直接轉換
   - 確定需要重構的部分

2. **狀態管理重構**：
   - 避免 prop drilling，使用 Inertia 的伺服器端狀態
   - 保留簡單的本地狀態（useState）
   - 複雜狀態改用 Inertia 的 `usePage()` 和 props

3. **組件轉換**：
   - 移除 React Router 相關程式碼
   - 改用 Inertia 的 `<Link>` 組件
   - 調整樣式以符合 Tailwind CSS 設計系統

#### 第三階段：整合與優化
1. **建立 Laravel 路由**：
   - 使用 `Inertia::render()` 回傳 React 組件
   - 配置適當的資料傳遞

2. **樣式統一**：
   - 使用現有 start-kit 的 Tailwind 配置
   - 移除原專案的 CSS Modules/Styled Components
   - 確保響應式設計

### 7. 技術決策重點

#### 狀態管理策略：
- **簡單狀態**：保留 `useState` 用於純 UI 狀態
- **複雜狀態**：使用 Inertia 的伺服器端狀態管理
- **表單狀態**：使用 Inertia 的 `<Form>` 組件
- **全域狀態**：避免 Context API，改用 Inertia 的 page props

#### 轉換優先順序：
1. **高優先級**：核心 UI 組件、基本互動功能
2. **中優先級**：表單處理、資料展示
3. **低優先級**：複雜的路由邏輯、第三方整合
