<?php

namespace App\Models;

use App\RoleLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\Activitylog\Support\LogOptions;

class User extends Authenticatable
{
    use HasFactory;
    use LogsActivity;

    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'two_factor_secret',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $fillable = [
        'email',
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
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

    public function leaves(): HasMany
    {
        return $this->hasMany(Leave::class, 'requester_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logExcept(['id', 'created_at', 'updated_at'])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

    public function hasRoleLevel(RoleLevel $roleLevel): bool
    {
        $role = $this;
        do  {
            if ($role->id === $roleLevel) {
                return true;
            }
            $role = $role->parent;
        } while ($role != null);

        return false;
    }

    public function getRemainingLeaveDays(): int
    {
        $data = $this->data;
        $days = $data->annual_leave_days;

        $startedServiceOn = $data->started_service_on;
        $today = now();

        $currentServicePeriod = $startedServiceOn->copy()->year($today->year);

        if ($currentServicePeriod->isFuture()) {
            $currentServicePeriod->subYear();
        }
        $servicePeriodEnds = $currentServicePeriod->copy()->addYear();

        $leaves = $this->leaves()->whereBetween('start_on', [$currentServicePeriod, $servicePeriodEnds])->get();

        foreach ($leaves as $leave) {
            $days -= $leave->getAmountOfDays();
        }

        return $days;
    }
}
