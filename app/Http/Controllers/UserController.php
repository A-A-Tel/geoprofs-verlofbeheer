<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Models\Department;
use App\Models\User;
use App\Models\UserData;
use App\Models\UserSetting;
use App\RoleLevel;
use App\StaticDepartments;
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
        $data = $request->validated();

        if ($data['role_id'] == RoleLevel::OfficeManager) {
            $data['department_id'] = StaticDepartments::Office->value;
            $data['supervisor_id'] = null;
        } else {
            if ($data['department_id'] === StaticDepartments::Office->value) {
                return redirect()->back()->withErrors([
                    'department_id' => 'Deze afdeling is alleen voor kantoormanagers.',
                ]);
            }
            if (! isset($data['supervisor_id']) && $data['role_id'] === RoleLevel::Employee->value) {
                return redirect()->back()->withErrors([
                    'role_id' => 'Medewerkers hebben een supervisor nodig',
                ]);
            }
            if ($data['role_id'] === RoleLevel::Manager->value) {
                $departmentManager = Department::findOrFail($data['department_id'])->getManager();
                if ($departmentManager == null) {
                    return redirect()->back()->withErrors([
                        'department_id' => 'Deze afdeling heeft nog geen leider, wijs er eerst eentje toe.',
                    ]);
                }
                $data['supervisor_id'] = $departmentManager->id;
            }
        }
        $user = new User($data);
        $user->role()->associate($data['role_id']);
        $user->department()->associate($data['department_id']);
        if ($data['supervisor_id'] ?? false) {
            $user->supervisor()->associate($data['supervisor_id']);
        }
        $user->save();

        $userSetting = new UserSetting($data);
        $userSetting->user()->associate($user);
        $userSetting->save();

        $userData = new UserData($data);
        $userData->user()->associate($user);
        $userData->save();

        return redirect()->route('user.index', ['status' => 'success']);
    }

    public function edit(string $id) {}

    public function update(string $id) {}

    public function destroy(string $id) {}
}
