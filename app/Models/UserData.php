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
        'remaining_leave',
    ];

    protected $hidden = [
        'citizen_service_number',
        'created_at',
        'updated_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
