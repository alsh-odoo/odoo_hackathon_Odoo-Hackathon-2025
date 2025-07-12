<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    const TABLE_NAME = 'users';
    const NAME = 'name';
    const EMAIL = 'email';
    const ROLE = 'role';
    const PASSWORD = 'password';

    protected $fillable = [
        self::NAME,
        self::EMAIL,
        self::PASSWORD,
        self::ROLE,
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function answers()
{
    return $this->hasMany(Answer::class);
}
}
