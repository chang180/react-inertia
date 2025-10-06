<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the images for the user.
     */
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    /**
     * Get the likes for the user.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Get the images liked by the user.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function likedImages()
    {
        return $this->belongsToMany(Image::class, 'likes');
    }

    /**
     * Check if user is a guest.
     */
    public function isGuest(): bool
    {
        return $this->role === 'guest';
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is a regular user.
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Get or create a guest user for demo purposes.
     */
    public static function getOrCreateGuest(): self
    {
        $sessionId = session()->getId();
        
        return static::firstOrCreate(
            ['email' => "guest_{$sessionId}@demo.local"],
            [
                'name' => '示範訪客',
                'role' => 'guest',
                'password' => bcrypt(uniqid('guest_', true)), // 隨機密碼，無法猜測
            ]
        );
    }

    /**
     * Check if this user can be authenticated through normal login.
     * Guest users should not be able to login normally.
     */
    public function canLogin(): bool
    {
        return $this->role !== 'guest';
    }

    /**
     * Override the default password verification to prevent guest login.
     */
    public function checkPassword($password): bool
    {
        // Guest users cannot login with password
        if ($this->isGuest()) {
            return false;
        }
        
        return parent::checkPassword($password);
    }
}
