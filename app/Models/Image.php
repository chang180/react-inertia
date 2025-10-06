<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /** @use HasFactory<\Database\Factories\ImageFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'vibe',
        'image_path',
        'liked_by',
    ];

    protected function casts(): array
    {
        return [
            'liked_by' => 'array',
        ];
    }
}
