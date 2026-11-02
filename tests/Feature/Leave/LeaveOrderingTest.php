<?php

namespace Feature\Leave;

use App\Models\Leave;
use App\Models\LeaveType;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Activitylog\Models\Activity;
use Tests\TestCase;

class LeaveOrderingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_order_leave()
    {
        $leaveType = LeaveType::where('name', 'Verlof')->firstOrFail();
        $user = UserFactory::new()->geodesy()->create();
        auth()->login($user);

        $request = $this->post(route('leave.store'), [
            'type' => $leaveType->id,
            'reason' => 'Vacation',
            'start_on' => now(),
            'end_on' => now()->addDays(24),
        ]);

        $availableDays = $user->getRemainingLeaveDays();

        $activity = Activity::all()->last();

        $request->assertValid();
        $this->assertEquals(5, $availableDays);
        $this->assertEquals(Leave::class, $activity->subject_type);
    }

    public function test_user_cannot_order_leave_in_the_past()
    {
        $leaveType = LeaveType::where('name', 'Verlof')->firstOrFail();
        $user = UserFactory::new()->geodesy()->create();
        $this->actingAs($user);

        $response = $this->post(route('leave.store'), [
            'type' => $leaveType->id,
            'reason' => 'Past Vacation',
            'start_on' => now()->subDays(5),
        ]);

        $response->assertInvalid(['start_on']);
    }

    public function test_user_cannot_order_leave_with_end_date_before_start_date()
    {
        $leaveType = LeaveType::where('name', 'Verlof')->firstOrFail();
        $user = UserFactory::new()->geodesy()->create();
        $this->actingAs($user);

        $response = $this->post(route('leave.store'), [
            'type' => $leaveType->id,
            'reason' => 'Time travel',
            'start_on' => now()->addDays(5),
            'end_on' => now()->addDays(2),
        ]);

        $response->assertInvalid(['end_on']);
    }

    public function test_user_cannot_order_leave_if_insufficient_leave_days()
    {
        $leaveType = LeaveType::where('name', 'Verlof')->firstOrFail();
        $user = UserFactory::new()->geodesy()->create();
        $this->actingAs($user);

        $response = $this->post(route('leave.store'), [
            'type' => $leaveType->id,
            'reason' => 'Exceeding limit vacation',
            'start_on' => now(),
            'end_on' => now()->addDays(200),
        ]);

        $this->assertEmpty($user->leaves);
    }
}
