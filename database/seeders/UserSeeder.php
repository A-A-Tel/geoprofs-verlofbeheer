<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use App\Models\UserData;
use App\Models\UserSetting;
use App\RoleLevel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User([
            'email' => 'regu.larjoe@bedrijf.nl',
            'password' => 'Hallo12345%',
        ]);

        $user->role()->associate(Role::findOrFail(RoleLevel::Employee));
        $user->department()->associate(Department::where('name', 'Geodesy')->firstOrFail());
        $user->save();

        $userSetting = new UserSetting;

        $userSetting->user()->associate($user);
        $userSetting->save();

        $userData = new UserData([
            'first_name' => 'Regu',
            'last_name' => 'Larjoe',
            'phone_number' => '+310612345678',
            'citizen_service_number' => '987654321',
            'started_service_on' => Date::now(),
            'annual_leave_days' => 30,
            'remaining_leave' => 30,
        ]);

        $userData->user()->associate($user);
        $userData->save();
    }
}
