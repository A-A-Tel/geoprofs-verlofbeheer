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
        $officeManager = new User([
            'email' => 'kan.toor@bedrijf.nl',
            'password' => 'Hallo12345%',
        ]);
        $officeManager->role()->associate(Role::findOrFail(RoleLevel::OfficeManager));
        $officeManager->department()->associate(Department::where('name', 'Office')->firstOrFail());
        $officeManager->save();

        $departmentManager = new User([
            'email' => 'afd.eling@bedrijf.nl',
            'password' => 'Hallo12345%',
        ]);
        $departmentManager->role()->associate(Role::findOrFail(RoleLevel::DepartmentManager));
        $departmentManager->department()->associate(Department::where('name', 'Geodesy')->firstOrFail());
        $departmentManager->save();

        $manager = new User([
            'email' => 'man.ager@bedrijf.nl',
            'password' => 'Hallo12345%',
        ]);
        $manager->role()->associate(Role::findOrFail(RoleLevel::Manager));
        $manager->department()->associate(Department::where('name', 'Geodesy')->firstOrFail());
        $manager->supervisor()->associate($departmentManager);
        $manager->save();

        $employee = new User([
            'email' => 'regu.larjoe@bedrijf.nl',
            'password' => 'Hallo12345%',
        ]);
        $employee->role()->associate(Role::findOrFail(RoleLevel::Employee));
        $employee->department()->associate(Department::where('name', 'Geodesy')->firstOrFail());
        $employee->supervisor()->associate($manager);
        $employee->save();

        $employeeSetting = new UserSetting;
        $employeeSetting->user()->associate($employee);
        $employeeSetting->save();

        $managerSetting = new UserSetting;
        $managerSetting->user()->associate($manager);
        $managerSetting->save();

        $departmentManagerSetting = new UserSetting;
        $departmentManagerSetting->user()->associate($departmentManager);
        $departmentManagerSetting->save();

        $officeManagerSetting = new UserSetting;
        $officeManagerSetting->user()->associate($officeManager);
        $officeManagerSetting->save();

        $employeeData = new UserData([
            'first_name' => 'Regu',
            'last_name' => 'Larjoe',
            'phone_number' => '+310612345678',
            'citizen_service_number' => '987654321',
            'started_service_on' => Date::now(),
            'annual_leave_days' => 30,
            'remaining_leave' => 30,
        ]);
        $employeeData->user()->associate($employee);
        $employeeData->save();

        $managerData = $employeeData->replicate();
        $managerData->first_name = 'Man';
        $managerData->last_name = 'Ager';
        $managerData->user()->associate($manager);
        $managerData->save();

        $departmentManagerData = $managerData->replicate();
        $departmentManagerData->first_name = 'Afd';
        $departmentManagerData->last_name = 'Eling';
        $departmentManagerData->user()->associate($departmentManager);
        $departmentManagerData->save();

        $officeManagerData = $departmentManagerData->replicate();
        $officeManagerData->first_name = 'Kan';
        $officeManagerData->last_name = 'Toor';
        $officeManagerData->user()->associate($officeManager);
        $officeManagerData->save();
    }
}
