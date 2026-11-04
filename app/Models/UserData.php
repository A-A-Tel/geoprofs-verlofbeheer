<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserData extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'citizen_service_number',
        'started_service_on',
        'annual_leave_days',
    ];

    protected $hidden = [
        'id',
        'citizen_service_number',
        'started_service_on',
        'annual_leave_days',
        'created_at',
        'updated_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'started_service_on' => 'date',
        ];
    }
}
