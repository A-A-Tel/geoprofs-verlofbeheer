<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'role_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function withParents(): array
    {
        $role = $this->toArray();
        $nextParent = &$role;
        $parent = $this->parent;

        while ($parent != null) {
            $nextParent['parent'] = $parent;
            $nextParent = &$nextParent['parent'];
            $parent = $parent->parent;
        }

        return $role;
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
