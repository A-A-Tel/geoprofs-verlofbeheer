<?php

namespace Database\Seeders;

use App\Models\Role;
use App\RoleLevel;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $office_manager = Role::create([
            'id' => RoleLevel::OfficeManager,
            'name' => 'Officemanager',
        ]);

        $department_manager = Role::create([
            'id' => RoleLevel::DepartmentManager,
            'name' => 'Afdelingsleider',
        ]);

        $manager = Role::create([
            'id' => RoleLevel::Manager,
            'name' => 'Manager',
        ]);

        $administrator = Role::create([
            'id' => RoleLevel::Administrator,
            'name' => 'Administrator',
        ]);

        $employee = Role::create([
            'id' => RoleLevel::Employee,
            'name' => 'Medewerker',
        ]);

        $manager->parent()->associate($employee);
        $department_manager->parent()->associate($manager);

        $office_manager->parent()->associate($employee);

        $administrator->parent()->associate($employee);

        $employee->save();
        $manager->save();
        $department_manager->save();
        $office_manager->save();
        $administrator->save();
    }
}
