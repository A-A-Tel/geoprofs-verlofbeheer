<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use App\RoleLevel;
use App\StaticDepartments;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {

        return [
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),

            'role_id' => fn () => Role::findOrFail(RoleLevel::Employee)->id,
        ];
    }

    /**
     * Replicate your seeder's joint-table instantiation structure
     */
    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->setting()->create();

            $user->data()->create([
                'first_name' => $this->faker->firstName(),
                'last_name' => $this->faker->lastName(),
                'phone_number' => '+3106'.Str::password(8, letters: false, numbers: true, symbols: false, spaces: false),
                'citizen_service_number' => Str::password(9, letters: false, numbers: true, symbols: false, spaces: false),
                'started_service_on' => Date::now(),
                'annual_leave_days' => 30,
            ]);
        });
    }

    public function employee(): static
    {
        $department = Department::where('name', 'Geodesy')->firstOrFail();

        return $this->state([
            'role_id' => RoleLevel::Employee,
            'supervisor_id' => User::factory()->manager(),
            'department_id' => $department->id,
        ]);
    }

    public function manager(): static
    {
        $department = Department::where('name', 'Geodesy')->firstOrFail();

        $departmentManager = $department->getManager()
            ?? User::factory()
                ->departmentManager()
                ->create();

        return $this->state([
            'role_id' => RoleLevel::Manager,
            'supervisor_id' => $departmentManager->id,
            'department_id' => $department->id,
        ]);
    }

    public function departmentManager(): static
    {
        $department = Department::where('name', 'Geodesy')->firstOrFail();

        return $this->state([
            'role_id' => RoleLevel::DepartmentManager,
            'department_id' => $department->id,
        ]);
    }

    public function officeManager(): static
    {
        return $this->state([
            'role_id' => RoleLevel::OfficeManager,
            'department_id' => fn () => Department::findOrFail(StaticDepartments::Office)->id,
        ]);
    }
}
