<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Models\Image;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index(Request $request)
    {
        $query = Image::query();

        // 搜尋功能
        if ($request->filled('search')) {
            $query->where('vibe', 'like', '%' . $request->search . '%');
        }

        // 分頁
        $images = $query->orderBy('created_at', 'desc')->paginate(9);

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

    public function toggleLike(Image $image)
    {
        // 簡化版本：假設用戶 ID 為 1（實際應用中應該從認證中獲取）
        $userId = 1;
        
        $like = Like::where('user_id', $userId)
                   ->where('image_id', $image->id)
                   ->first();
        
        if ($like) {
            // 移除喜歡
            $like->delete();
            $isLiked = false;
        } else {
            // 添加喜歡
            Like::create([
                'user_id' => $userId,
                'image_id' => $image->id,
            ]);
            $isLiked = true;
        }
        
        // 更新舊的 liked_by 欄位以向後相容
        $likedBy = $image->likes()->pluck('user_id')->toArray();
        $image->update(['liked_by' => $likedBy]);

        return response()->json([
            'success' => true,
            'isLiked' => $isLiked,
            'likesCount' => $image->likes_count,
            'liked_by' => $likedBy, // 向後相容
        ]);
    }
}
