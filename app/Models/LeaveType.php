<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Models\Concerns\LogsActivity;

class LeaveType extends Model
{
    use LogsActivity;

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    public function leaves(): HasMany
    {
        return $this->hasMany(Leave::class, 'type_id');
    }
}
