<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'two_factor_secret',
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'email',
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed'
        ];
    }

    public function setting(): HasOne
    {
        return $this->hasOne(UserSetting::class, 'user_id');
    }

    public function data(): HasOne
    {
        return $this->hasOne(UserData::class, 'user_id');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
