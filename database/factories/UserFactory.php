<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use App\RoleLevel;
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
            'department_id' => fn () => Department::factory(),
        ];
    }

    /**
     * Replicate your seeder's joint-table instantiation structure
     */
    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->setting()->create([]);

            $user->data()->create([
                'first_name' => $this->faker->firstName(),
                'last_name' => $this->faker->lastName(),
                'phone_number' => '+3106'.Str::password(8, letters: false, numbers: true, symbols: false, spaces: false),
                'citizen_service_number' => Str::password(9, letters: false, numbers: true, symbols: false, spaces: false),
                'started_service_on' => Date::now(),
                'annual_leave_days' => 30,
                'remaining_leave' => 30,
            ]);
        });
    }

    public function regularJoe(): static
    {
        return $this->state([
            'email' => 'regu.larjoe@bedrijf.nl',
            'password' => Hash::make('Hallo12345%'),
            'department_id' => fn () => Department::where(['name' => 'Geodesy'])->firstOrFail()->id,
        ])->afterCreating(function (User $user) {
            $user->data()->update([
                'first_name' => 'Regu',
                'last_name' => 'Larjoe',
                'citizen_service_number' => '987654321',
            ]);
        });
    }
}
