<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::create([
            'name' => 'ICT',
        ])->save();

        Department::create([
            'name' => 'Office',
        ])->save();

        Department::create([
            'name' => 'Geodesy',
        ])->save();
    }
}
