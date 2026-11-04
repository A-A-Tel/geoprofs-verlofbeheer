<?php

namespace Feature\User;

use App\Models\Department;
use App\Models\User;
use App\RoleLevel;
use App\StaticDepartments;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Activitylog\Models\Activity;
use Tests\TestCase;

class UserCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_employee_as_office_manager() {
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

    public function test_create_manager_as_office_manager()
    {
        $user = User::factory()->officeManager()->create();
        $departmentManager = User::factory()->departmentManager()->create();

        auth()->login($user);

        $email = 'test.user@bedrijf.nl';
        $request = $this->post(route('user.store'), [
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => $email,
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::Manager->value,
            'department_id' => $departmentManager->department_id,
        ]);

        $activity = Activity::all()->last();

        $request->assertValid();
        $request->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => $email]);
        $this->assertEquals(User::class, $activity->subject_type);
    }

    public function test_create_department_manager_as_office_manager() {
        $user = User::factory()->officeManager()->create();
        $department = Department::factory()->create();
        auth()->login($user);

        $email = 'bart.peters@bedrijf.nl';

        $request = $this->post(route('user.store'), [
            'first_name' => 'Bart',
            'last_name' => 'Peters',
            'email' => $email,
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::DepartmentManager->value,
            'department_id' => $department->id,
        ]);

        $activity = Activity::all()->last();

        $request->assertValid();
        $request->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => $email]);
        $this->assertEquals(User::class, $activity->subject_type);
    }

    public function test_create_user_with_missing_required_fields()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), []);

        $request->assertInvalid([
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'citizen_service_number',
            'started_service_on',
            'annual_leave_days',
            'password',
            'role_id',
        ]);
    }

    public function test_create_user_with_invalid_email()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'email' => 'not-an-email',
        ]);

        $request->assertInvalid(['email']);
    }

    public function test_create_user_with_existing_email()
    {
        $existingUser = User::factory()->employee()->create();

        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'email' => $existingUser->email,
        ]);

        $request->assertInvalid(['email']);
    }

    public function test_create_user_with_invalid_role()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'role_id' => 999,
        ]);

        $request->assertInvalid(['role_id']);
    }

    public function test_create_user_with_nonexistent_supervisor()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'supervisor_id' => 999999,
        ]);

        $request->assertInvalid(['supervisor_id']);
    }

    public function test_create_user_with_nonexistent_department()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'department_id' => 999999,
        ]);

        $request->assertInvalid(['department_id']);
    }

    public function test_create_user_with_negative_annual_leave_days()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'annual_leave_days' => -1,
        ]);

        $request->assertInvalid(['annual_leave_days']);
    }

    public function test_create_user_with_annual_leave_days_above_limit()
    {
        $user = User::factory()->officeManager()->create();
        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'annual_leave_days' => 256,
        ]);

        $request->assertInvalid(['annual_leave_days']);
    }

    public function test_non_office_department_cannot_be_assigned_to_office_manager()
    {
        $user = User::factory()->officeManager()->create();
        $department = Department::factory()->create();

        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test.user@bedrijf.nl',
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::Manager->value,
            'department_id' => StaticDepartments::Office->value,
        ]);

        $request->assertRedirectBackWithErrors([
            'department_id' => 'Deze afdeling is alleen voor kantoormanagers.',
        ]);
    }

    public function test_employee_cannot_have_no_supervisor()
    {
        $user = User::factory()->officeManager()->create();
        $manager = User::factory()->manager()->create();

        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test.user@bedrijf.nl',
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::Employee->value,
            'department_id' => $manager->department_id,
        ]);

        $request->assertRedirectBackWithErrors([
            'role_id' => 'Medewerkers hebben een supervisor nodig',
        ]);
    }

    public function test_manager_cannot_be_created_in_department_without_department_manager()
    {
        $user = User::factory()->officeManager()->create();
        $department = Department::factory()->create();

        auth()->login($user);

        $request = $this->post(route('user.store'), [
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test.user@bedrijf.nl',
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::Manager->value,
            'department_id' => $department->id,
        ]);

        $request->assertRedirectBackWithErrors([
            'department_id' => 'Deze afdeling heeft nog geen leider, wijs er eerst eentje toe.',
        ]);
    }
}
