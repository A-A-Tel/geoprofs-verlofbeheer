<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Activitylog\Models\Activity;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $activity = Activity::all()->last();

        $this->assertAuthenticated();

        $this->assertEquals($user->id, $activity->subject->id);
        $this->assertEquals('User logged in', $activity->description);
        $this->assertEquals('auth.login', $activity->event);
        $this->assertArrayHasKey('ip', $activity->properties);

        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_log_out_using_logout_button() {

        $user = User::factory()->create();

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $this->assertAuthenticated();

        $this->post(route('logout'));

        $activity = Activity::all()->last();

        $this->assertEquals($user->id, $activity->subject->id);
        $this->assertEquals('User logged out', $activity->description);
        $this->assertEquals('auth.logout', $activity->event);
        $this->assertArrayHasKey('ip', $activity->properties);

        $this->assertGuest();
    }
}
