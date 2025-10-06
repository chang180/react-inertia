<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Models\Image;
use App\Models\Like;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index(Request $request)
    {
        // 獲取或建立 Guest 用戶並自動登入
        $guestUser = User::getOrCreateGuest();
        
        // 如果沒有已認證的用戶，則自動登入 Guest 用戶
        if (!Auth::check()) {
            Auth::login($guestUser);
        }
        
        // 獲取 public/images 目錄中的所有圖片檔案
        $imageFiles = glob(public_path('images/chihiro*.jpg'));
        $demoImages = [];
        
        foreach ($imageFiles as $index => $filePath) {
            $fileName = basename($filePath);
            $imageNumber = str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $imageId = $index + 1;
            
            // 檢查當前已認證用戶是否已收藏此圖片
            /** @var \App\Models\User $currentUser */
            $currentUser = Auth::user();
            
            // 對於示範圖片，使用 session 檢查收藏狀態
            $sessionKey = "demo_likes_{$currentUser->id}";
            $demoLikes = session($sessionKey, []);
            $isLiked = in_array($imageId, $demoLikes);
            
            $demoImages[] = [
                'id' => $imageId,
                'name' => "千尋示範圖片 {$imageNumber}",
                'vibe' => "宮崎駿動畫《神隱少女》的經典場景",
                'image_path' => "/images/{$fileName}",
                'liked_by' => $isLiked ? [$currentUser->id] : [], // 使用當前用戶的收藏狀態
            ];
        }
        
        // 搜尋功能
        if ($request->filled('search')) {
            $searchTerm = strtolower($request->search);
            $demoImages = array_filter($demoImages, function($image) use ($searchTerm) {
                return strpos(strtolower($image['name']), $searchTerm) !== false || 
                       strpos(strtolower($image['vibe']), $searchTerm) !== false;
            });
        }
        
        // 分頁處理
        $perPage = 9;
        $currentPage = $request->get('page', 1);
        $total = count($demoImages);
        $offset = ($currentPage - 1) * $perPage;
        $paginatedImages = array_slice($demoImages, $offset, $perPage);
        
        // 建立分頁資料結構
        $images = [
            'data' => $paginatedImages,
            'current_page' => (int) $currentPage,
            'last_page' => (int) ceil($total / $perPage),
            'per_page' => $perPage,
            'total' => $total,
        ];

        return Inertia::render('welcome', [
            'images' => $images,
            'searchQuery' => $request->search,
        ]);
    }

    public function store(StoreImageRequest $request)
    {
        // 處理檔案上傳
        $imageFile = $request->file('image');
        $imagePath = $imageFile->store('images', 'public');

        // 建立圖片記錄
        $image = Image::create([
            'name' => $request->name,
            'vibe' => $request->vibe,
            'image_path' => Storage::url($imagePath),
            'liked_by' => [], // 保留舊欄位以向後相容
            'user_id' => 1, // 簡化處理：假設用戶 ID 為 1
        ]);

        return redirect()->back()->with('success', '圖片上傳成功！');
    }

    public function toggleLike($imageId)
    {
        // 確保有已認證的用戶
        if (!Auth::check()) {
            // 如果沒有認證用戶，自動登入 Guest 用戶
            $guestUser = User::getOrCreateGuest();
            Auth::login($guestUser);
        }
        
        /** @var \App\Models\User $currentUser */
        $currentUser = Auth::user();
        
        // 檢查是否為示範圖片（ID 1-50）
        if ($imageId >= 1 && $imageId <= 50) {
            // 處理示範圖片的收藏 - 使用 session 儲存
            $sessionKey = "demo_likes_{$currentUser->id}";
            $demoLikes = session($sessionKey, []);
            
            if (in_array($imageId, $demoLikes)) {
                // 移除收藏
                $demoLikes = array_filter($demoLikes, fn($id) => $id !== $imageId);
                $isLiked = false;
            } else {
                // 添加收藏
                $demoLikes[] = $imageId;
                $isLiked = true;
            }
            
            session([$sessionKey => $demoLikes]);
            
            // 重新導向回原頁面以更新狀態
            return redirect()->back();
        }
        
        // 處理真實圖片的收藏（僅限已認證用戶）
        if (!Auth::check()) {
            return redirect()->back()->withErrors([
                'message' => '請先登入以收藏圖片',
            ]);
        }
        
        $image = Image::findOrFail($imageId);
        $user = Auth::user();
        
        $like = Like::where('user_id', $user->id)
                   ->where('image_id', $image->id)
                   ->first();
        
        if ($like) {
            // 移除喜歡
            $like->delete();
            $isLiked = false;
        } else {
            // 添加喜歡
            Like::create([
                'user_id' => $user->id,
                'image_id' => $image->id,
            ]);
            $isLiked = true;
        }
        
        // 更新舊的 liked_by 欄位以向後相容
        $likedBy = $image->likes()->pluck('user_id')->toArray();
        $image->update(['liked_by' => $likedBy]);

        // 重新導向回原頁面以更新狀態
        return redirect()->back();
    }

    public function getFavorites()
    {
        // 確保有已認證的用戶
        if (!Auth::check()) {
            $guestUser = User::getOrCreateGuest();
            Auth::login($guestUser);
        }
        
        $currentUser = Auth::user();
        
        // 獲取所有示範圖片
        $imageFiles = glob(public_path('images/chihiro*.jpg'));
        $allDemoImages = [];
        
        foreach ($imageFiles as $index => $filePath) {
            $fileName = basename($filePath);
            $imageNumber = str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $imageId = $index + 1;
            
            // 檢查當前用戶是否已收藏此圖片
            $sessionKey = "demo_likes_{$currentUser->id}";
            $demoLikes = session($sessionKey, []);
            $isLiked = in_array($imageId, $demoLikes);
            
            if ($isLiked) {
                $allDemoImages[] = [
                    'id' => $imageId,
                    'name' => "千尋示範圖片 {$imageNumber}",
                    'vibe' => "宮崎駿動畫《神隱少女》的經典場景",
                    'image_path' => "/images/{$fileName}",
                    'liked_by' => [$currentUser->id],
                ];
            }
        }
        
        return response()->json([
            'favorites' => $allDemoImages,
            'count' => count($allDemoImages)
        ]);
    }
}
