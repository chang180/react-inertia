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
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'liked_by' => 'array',
        ];
    }

    /**
     * Get the user that owns the image.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the likes for the image.
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Get the users who liked this image.
     */
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'likes');
    }

    /**
     * Check if a user has liked this image.
     */
    public function isLikedBy($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }

    /**
     * Get the total number of likes for this image.
     */
    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }
}
