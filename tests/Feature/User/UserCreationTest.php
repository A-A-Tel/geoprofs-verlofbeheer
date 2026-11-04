<?php

namespace Feature\User;

use App\Models\User;
use App\RoleLevel;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Activitylog\Models\Activity;
use Tests\TestCase;

class UserCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user_as_office_manager() {
        $user = User::factory()->officeManager()->create();
        $manager = User::factory()->manager()->create();
        auth()->login($user);

        $email = 'regu.larjoe@bedrijf.nl';

        $request = $this->post(route('user.store'), [
            'first_name' => 'Regu',
            'last_name' => 'Larjoe',
            'email' => $email,
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::Employee->value,
            'supervisor_id' => $manager->id,
            'department_id' => $manager->department_id,
        ]);

        $activity = Activity::all()->last();

        $request->assertValid();
        $request->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => $email]);
        $this->assertEquals(User::class, $activity->subject_type);
    }
}
