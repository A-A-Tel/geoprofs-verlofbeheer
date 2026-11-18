<?php

namespace Feature\User;

use App\Models\Department;
use App\Models\User;
use App\RoleLevel;
use App\StaticDepartments;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserUpdatingTest extends TestCase
{
    use RefreshDatabase;

    private function validUpdateData(array $overrides = []): array
    {
        return array_merge([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test.user@bedrijf.nl',
            'phone_number' => '0612345678',
            'citizen_service_number' => '357918462',
            'started_service_on' => Carbon::today(),
            'annual_leave_days' => 30,
            'password' => 'Hallo12345%',
            'role_id' => RoleLevel::Employee->value,
            'department_id' => null,
            'supervisor_id' => null,
        ], $overrides);
    }

    private function createEmployee(): User
    {
        return User::factory()->employee()->create();
    }

    public function test_update_employee_as_office_manager()
    {
        $officeManager = User::factory()->officeManager()->create();
        $manager = User::factory()->manager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $request = $this->put(route('user.update', $employee), $this->validUpdateData([
            'email' => 'updated.employee@bedrijf.nl',
            'supervisor_id' => $manager->id,
            'department_id' => $manager->department_id,
        ]));

        $request->assertValid();
        $request->assertRedirect();

        $this->assertDatabaseHas('users', [
            'id' => $employee->id,
            'email' => $employee->email,
            'role_id' => RoleLevel::Employee->value,
            'department_id' => $manager->department_id,
            'supervisor_id' => $manager->id,
        ]);
    }

    public function test_update_manager_as_office_manager()
    {
        $officeManager = User::factory()->officeManager()->create();
        $departmentManager = User::factory()->departmentManager()->create();
        $manager = User::factory()->manager()->create();

        $request = $this->validUpdateData([
            'email' => 'updated.manager@bedrijf.nl',
            'role_id' => RoleLevel::Manager->value,
            'department_id' => $departmentManager->department_id,
        ]);

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $manager), $request);

        $response->assertValid();
        $response->assertRedirect();

        $this->assertDatabaseHas('users', [
            'id' => $manager->id,
            'email' => $manager->email,
            'role_id' => RoleLevel::Manager->value,
            'department_id' => $departmentManager->department_id,
            'supervisor_id' => $departmentManager->id,
        ]);
    }

    public function test_update_department_manager_as_office_manager()
    {
        $officeManager = User::factory()->officeManager()->create();
        $department = Department::factory()->create();
        $departmentManager = User::factory()->departmentManager()->create();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $departmentManager), $this->validUpdateData([
            'email' => 'updated.department.manager@bedrijf.nl',
            'role_id' => RoleLevel::DepartmentManager->value,
            'department_id' => $department->id,
        ]));

        $response->assertValid();
        $response->assertRedirect();

        $this->assertDatabaseHas('users', [
            'id' => $departmentManager->id,
            'role_id' => RoleLevel::DepartmentManager->value,
            'department_id' => $department->id,
        ]);
    }

        public function test_update_user_to_office_manager()
        {
            $officeManager = User::factory()->officeManager()->create();
            $employee = $this->createEmployee();

            auth()->login($officeManager);

            $response = $this->put(route('user.update', $employee), $this->validUpdateData([
                'role_id' => RoleLevel::OfficeManager->value,
                'department_id' => StaticDepartments::Office->value,
            ]));

            $response->assertValid();
            $response->assertRedirect();

            $this->assertDatabaseHas('users', [
                'id' => $employee->id,
                'role_id' => RoleLevel::OfficeManager->value,
                'department_id' => StaticDepartments::Office->value,
                'supervisor_id' => null,
            ]);
        }

    public function test_update_user_with_invalid_email()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'email' => 'not-an-email',
        ]));

        $response->assertInvalid(['email']);
    }

    public function test_update_user_with_existing_email()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();
        $otherEmployee = User::factory()->employee()->create();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'email' => $otherEmployee->email,
        ]));

        $response->assertInvalid(['email']);
    }

    public function test_update_user_with_invalid_role()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'role_id' => 999,
        ]));

        $response->assertInvalid(['role_id']);
    }

    public function test_update_user_with_nonexistent_supervisor()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'supervisor_id' => 999999,
        ]));

        $response->assertInvalid(['supervisor_id']);
    }

    public function test_update_user_with_nonexistent_department()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'department_id' => 999999,
        ]));

        $response->assertInvalid(['department_id']);
    }

    public function test_update_user_with_negative_annual_leave_days()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'annual_leave_days' => -1,
        ]));

        $response->assertInvalid(['annual_leave_days']);
    }

    public function test_update_user_with_annual_leave_days_above_limit()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'annual_leave_days' => 256,
        ]));

        $response->assertInvalid(['annual_leave_days']);
    }

    public function test_non_office_department_cannot_be_assigned_to_office_manager()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();
        $department = Department::factory()->create();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'role_id' => RoleLevel::Manager->value,
            'department_id' => StaticDepartments::Office->value,
        ]));

        $response->assertRedirectBackWithErrors([
            'department_id' => 'Deze afdeling is alleen voor kantoormanagers.',
        ]);
    }

    public function test_update_employee_with_same_email()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), [
            'email' => $employee->email,
        ]);

        var_dump($response->baseRequest->array());

        $response->assertValid();
        $response->assertRedirect();
    }

    public function test_employee_cannot_have_no_supervisor()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'role_id' => RoleLevel::Employee->value,
            'supervisor_id' => null,
        ]));

        $response->assertRedirectBackWithErrors([
            'role_id' => 'Medewerkers hebben een supervisor nodig',
        ]);
    }

    public function test_manager_cannot_be_created_in_department_without_department_manager()
    {
        $officeManager = User::factory()->officeManager()->create();
        $employee = $this->createEmployee();
        $department = Department::factory()->create();

        auth()->login($officeManager);

        $response = $this->put(route('user.update', $employee), $this->validUpdateData([
            'role_id' => RoleLevel::Manager->value,
            'department_id' => $department->id,
        ]));

        $response->assertRedirectBackWithErrors([
            'department_id' => 'Deze afdeling heeft nog geen leider, wijs er eerst eentje toe.',
        ]);
    }
}
