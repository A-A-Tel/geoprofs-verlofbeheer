<?php

namespace App\Models;

use App\RoleLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

class Department extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'name',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'department_id');
    }

    public function manager(): User
    {
        return User::where(['role_id' => RoleLevel::DepartmentManager, 'department_id' => $this->id])->firstOrFail();
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
