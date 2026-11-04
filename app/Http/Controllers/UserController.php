<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveCreateRequest;
use App\Models\UserData;

class UserController extends Controller
{
    public function index()
    {
        $users = UserData::all();

        return inertia('user/index', ['users' => $users]);
    }

    public function show(string $id) {}

    public function create() {
        return inertia('user/create');
    }

    public function store(LeaveCreateRequest $request) {}

    public function edit(string $id) {}

    public function update(string $id) {}

    public function destroy(string $id) {}
}
