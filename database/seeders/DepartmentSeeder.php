<?php

namespace Database\Seeders;

use App\Models\Department;
use App\StaticDepartments;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ict = new Department;
        $ict->id = StaticDepartments::Ict;
        $ict->name = 'ICT';
        $ict->save();

        $office = new Department;
        $office->id = StaticDepartments::Office;
        $office->name = 'Office';
        $office->save();

        Department::create([
            'name' => 'Geodesy',
        ])->save();
    }
}
