<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Models\Image;
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

        return Inertia::render('Welcome', [
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
            'liked_by' => [],
        ]);

        return redirect()->back()->with('success', '圖片上傳成功！');
    }

    public function toggleLike(Image $image)
    {
        // 簡化版本：假設用戶 ID 為 1（實際應用中應該從認證中獲取）
        $userId = 1;
        
        $likedBy = $image->liked_by ?? [];
        
        if (in_array($userId, $likedBy)) {
            // 移除喜歡
            $likedBy = array_filter($likedBy, fn($id) => $id !== $userId);
        } else {
            // 添加喜歡
            $likedBy[] = $userId;
        }
        
        $image->update(['liked_by' => array_values($likedBy)]);

        return response()->json([
            'success' => true,
            'liked_by' => $image->liked_by,
        ]);
    }
}
