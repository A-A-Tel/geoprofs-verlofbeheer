<?php

namespace Database\Seeders;

use App\Models\LeaveType;
use Illuminate\Database\Seeder;

class LeaveTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $leave = LeaveType::create(['name' => 'Verlof']);
        $sick = LeaveType::create(['name' => 'Ziek']);

        $leave->save();
        $sick->save();
    }
}
