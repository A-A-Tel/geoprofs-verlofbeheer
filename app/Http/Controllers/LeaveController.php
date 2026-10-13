<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveCreateRequest;
use App\Models\Leave;
use App\Models\LeaveType;
use App\RoleLevel;
use Illuminate\Support\Facades\Log;

class LeaveController extends Controller
{
    public function index()
    {

    }

    public function show(string $id)
    {

    }

    public function create()
    {
        $user = auth()->user();

        if ($user == null || ! $user->hasRoleLevel(RoleLevel::Employee)) {
            return redirect()->back();
        }
        return inertia('leave', ['types' => LeaveType::all(), 'available_days' => $user->getRemainingLeaveDays()]);
    }

    public function store(LeaveCreateRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();

        $leave = new Leave($data);

        $leave->requester()->associate($user);
        $leave->supervisor()->associate($user->supervisor);
        $leave->manager()->associate($user->department->getManager());
        $leave->type()->associate($data['type']);

        if ($leave->type->name === 'Verlof' && $leave->getAmountOfDays() > $user->getRemainingLeaveDays()) {
            return redirect()->route('leave.create', ['status' => 'failed']);
        }

        Log::warning($leave->start_on);
        $leave->save();

        return redirect()->route('leave.store', ['status' => 'success']);
    }

    public function edit(string $id)
    {

    }

    public function update(string $id)
    {

    }

    public function destroy(string $id)
    {

    }
}
