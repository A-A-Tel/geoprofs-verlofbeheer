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

    public function create() {}

    public function store(UserCreateRequest $request)
    {
        $user = $request->user();
        if ($user == null || ! $user->hasRoleLevel(RoleLevel::OfficeManager)) {
            return redirect()->route('dashboard');
        }
        $data = $request->validated();

        if ($data['role_id'] == RoleLevel::OfficeManager) {
            $data['department_id'] = StaticDepartments::Office;
            $data['supervisor_id'] = null;
        } else {
            if ($data['department_id'] === StaticDepartments::Office) {
                return redirect()->back()->withErrors([
                    'department_id' => 'Deze afdeling is alleen voor kantoormanagers.',
                ]);
            }
            if ($data['supervisor_id'] == null && $data['role_id'] === RoleLevel::Employee) {
                return redirect()->back()->withErrors([
                    'role_id' => 'Medewerkers hebben een supervisor nodig',
                ]);
            }
            if ($data['role_id'] === RoleLevel::Manager) {
                $departmentManager = Department::findOrFail($data['department_id'])->getManager();
                if ($departmentManager == null) {
                    return redirect()->back()->withErrors([
                        'department_id' => 'Deze afdeling heeft nog geen leider, wijs er eerst eentje toe.',
                    ]);
                }
                $data['supervisor_id'] = $departmentManager->id;
            }
        }
        $user = User::create($data);
        $user->role()->associate($data['role_id']);
        $user->department()->associate($data['department_id']);
        if ($data['supervisor_id'] != null) {
            $user->supervisor()->associate($data['supervisor_id']);
        }
        $user->save();

        $userSetting = UserSetting::create($data);
        $userSetting->user()->associate($user);
        $userSetting->save();

        $userData = UserData::create($data);
        $userData->user()->associate($user);
        $userData->save();

        return redirect()->route('user.index', ['success' => true]);
    }

    public function edit(string $id) {}

    public function update(string $id) {}

    public function destroy(string $id) {}
}
