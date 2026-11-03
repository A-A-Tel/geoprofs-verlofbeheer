<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Models\UserData;
use App\RoleLevel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (!($request->user()?->hasRoleLevel(RoleLevel::OfficeManager))) return redirect()->route('dashboard');

        $users = UserData::all();

        return inertia('user/index', ['users' => $users]);
    }

    public function show(string $id) {}

    public function create() {}

    public function store(UserCreateRequest $request) {}

    public function edit(string $id) {}

    public function update(string $id) {}

    public function destroy(string $id) {}
}
