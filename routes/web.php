<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ImageController::class, 'index'])->name('home');

// 圖片相關路由
Route::post('/images', [ImageController::class, 'store'])->name('images.store');
Route::patch('/images/{image}/like', [ImageController::class, 'toggleLike'])->name('images.like');
Route::get('/images/favorites', [ImageController::class, 'getFavorites'])->name('images.favorites');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
