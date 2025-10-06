<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // 使用原專案中的真實圖片
        $imageFiles = [
            'chihiro001.jpg', 'chihiro002.jpg', 'chihiro003.jpg', 'chihiro004.jpg', 'chihiro005.jpg',
            'chihiro006.jpg', 'chihiro007.jpg', 'chihiro008.jpg', 'chihiro009.jpg', 'chihiro010.jpg',
            'chihiro011.jpg', 'chihiro012.jpg', 'chihiro013.jpg', 'chihiro014.jpg', 'chihiro015.jpg',
            'chihiro016.jpg', 'chihiro017.jpg', 'chihiro018.jpg', 'chihiro019.jpg', 'chihiro020.jpg',
            'chihiro021.jpg', 'chihiro022.jpg', 'chihiro023.jpg', 'chihiro024.jpg', 'chihiro025.jpg',
            'chihiro026.jpg', 'chihiro027.jpg', 'chihiro028.jpg', 'chihiro029.jpg', 'chihiro030.jpg',
            'chihiro031.jpg', 'chihiro032.jpg', 'chihiro033.jpg', 'chihiro034.jpg', 'chihiro035.jpg',
            'chihiro036.jpg', 'chihiro037.jpg', 'chihiro038.jpg', 'chihiro039.jpg', 'chihiro040.jpg',
            'chihiro041.jpg', 'chihiro042.jpg', 'chihiro043.jpg', 'chihiro044.jpg', 'chihiro045.jpg',
            'chihiro046.jpg', 'chihiro047.jpg', 'chihiro048.jpg', 'chihiro049.jpg', 'chihiro050.jpg'
        ];

        return [
            'name' => fake()->words(2, true),
            'vibe' => fake()->randomElement(['cozy', 'modern', 'vintage', 'minimalist', 'colorful', 'nature', 'fantasy', 'magical', 'peaceful', 'dreamy']),
            'image_path' => '/images/' . fake()->randomElement($imageFiles),
            'liked_by' => [],
            'user_id' => \App\Models\User::factory(), // 隨機分配給一個用戶
        ];
    }
}
