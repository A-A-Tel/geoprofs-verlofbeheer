<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveCreateRequest;

class UserController extends Controller
{
    public function index()
    {
        return inertia('user');
    }

    public function show(string $id) {}

    public function create() {}

    public function store(LeaveCreateRequest $request) {}

    public function edit(string $id) {}

    public function update(string $id) {}

    public function destroy(string $id) {}
}
