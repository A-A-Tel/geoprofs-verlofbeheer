<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

class Role extends Model
{
    use LogsActivity;
    protected $fillable = [
        'id',
        'name',
    ];

    protected $hidden = [
        'parent_id',
        'created_at',
        'updated_at',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logExcept(['id', 'created_at', 'updated_at'])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }
}
