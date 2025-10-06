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
        return [
            'name' => fake()->words(2, true),
            'vibe' => fake()->randomElement(['cozy', 'modern', 'vintage', 'minimalist', 'colorful', 'nature']),
            'image_path' => 'https://picsum.photos/400/400?random=' . fake()->numberBetween(1, 1000),
            'liked_by' => [],
        ];
    }
}
