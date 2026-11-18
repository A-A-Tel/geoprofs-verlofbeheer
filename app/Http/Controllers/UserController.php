<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Department;
use App\Models\User;
use App\Models\UserData;
use App\Models\UserSetting;
use App\RoleLevel;
use App\StaticDepartments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user == null || ! $user->hasRoleLevel(RoleLevel::OfficeManager)) {
            return redirect()->route('dashboard');
        }

        $users = UserData::all();

        return inertia('user/index', ['users' => $users]);
    }

    public function show(string $id) {}

    public function create()
    {
        $users = User::with(['department', 'role', 'data'])->get()->toArray();
        $departments = Department::all()->toArray();

        return inertia('user/create', ['users' => $users, 'departments' => $departments]);
    }

    public function store(UserCreateRequest $request)
    {
        $user = $request->user();
        if ($user == null || ! $user->hasRoleLevel(RoleLevel::OfficeManager)) {
            return redirect()->route('dashboard');
        }
        $data = $this->validateUserRequest($request);

        if ($data instanceof RedirectResponse) {
            return $data;
        }

        $user = new User($data);
        $user->role()->associate($data['role_id']);
        $user->department()->associate($data['department_id']);
        if ($this->checkArrKeyIfSet($data, 'supervisor_id')) {
            $user->supervisor()->associate($data['supervisor_id']);
        }
        $user->save();

        $userSetting = new UserSetting($data);
        $userSetting->user()->associate($user);
        $userSetting->save();

        $userData = new UserData($data);
        $userData->user()->associate($user);
        $userData->save();

        return redirect()->route('user.index', ['success' => true]);
    }

    public function edit(User $user)
    {

        return inertia('user/edit', ['user' => $user]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {

        $data = $this->validateUserRequest($request);

        if ($data instanceof RedirectResponse) {
            return $data;
        }

        if (array_key_exists('role_id', $data)) {
            $user->role()->associate($data['role_id']);
        }

        if (array_key_exists('department_id', $data)) {
            $user->department()->associate($data['department_id']);
        }

        if (array_key_exists('supervisor_id', $data)) {
            $user->supervisor()->associate($data['supervisor_id']);
        }

        $user->save();

        $userData = UserData::where('user_id', $user->id)->firstOrFail();
        $userData->user()->associate($user);
        $userData->save();

        return redirect()->route('user.index', ['success' => true]);
    }

    public function destroy(User $user) {}

    private function validateUserRequest(FormRequest $request): RedirectResponse|array
    {
        $data = $request->validated();

        if ($this->compareArrKeyIfSet($data, 'role_id', RoleLevel::OfficeManager->value)) {
            $data['department_id'] = StaticDepartments::Office->value;
            $data['supervisor_id'] = null;
        } else {
            if ($this->compareArrKeyIfSet($data, 'department_id', StaticDepartments::Office->value)) {
                return redirect()->back()->withErrors([
                    'department_id' => 'Deze afdeling is alleen voor kantoormanagers.',
                ]);
            }
            if (
                ! isset($data['supervisor_id']) &&
                $this->compareArrKeyIfSet($data, 'role_id', RoleLevel::Employee->value)
            ) {
                return redirect()->back()->withErrors([
                    'role_id' => 'Medewerkers hebben een supervisor nodig',
                ]);
            }
            if ($this->compareArrKeyIfSet($data, 'role_id', RoleLevel::Manager->value)) {
                $departmentManager = Department::findOrFail($data['department_id'])->getManager();
                if ($departmentManager == null) {
                    return redirect()->back()->withErrors([
                        'department_id' => 'Deze afdeling heeft nog geen leider, wijs er eerst eentje toe.',
                    ]);
                }
                $data['supervisor_id'] = $departmentManager->id;
            }
        }

        return $data;
    }

    private function compareArrKeyIfSet(array $array, string $key, mixed $comparable): bool
    {
        if (! array_key_exists($key, $array)) {
            return false;
        }

        return $array[$key] === $comparable;
    }

    private function checkArrKeyIfSet(array $array, string $key): bool
    {
        if (! array_key_exists($key, $array)) {
            return false;
        }

        return $array[$key] == true;
    }
}
