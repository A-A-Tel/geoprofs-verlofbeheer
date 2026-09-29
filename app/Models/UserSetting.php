<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    protected $hidden = [
        'user_id',
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'notification_sound',
    ];

    protected function casts(): array
    {
        return [
            'notification_sound' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
