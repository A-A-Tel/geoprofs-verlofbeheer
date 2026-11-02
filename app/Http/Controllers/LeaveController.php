<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveCreateRequest;
use App\Models\Leave;
use App\Models\LeaveType;
use App\RoleLevel;

class LeaveController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (! $user->hasRoleLevel(RoleLevel::Manager)) {
            return redirect()->route('dashboard');
        }

        $leaves = Leave::where([
            'department_id' => $user->department_id,
            'supervisor_id' => $user->id,
        ])
            ->with([
                'type', 'requester.data',
            ])
            ->get()
            ->map(
                function ($leave) {
                    $array = $leave->toArray();
                    $array['requester'] = $leave->requester->data->toArray();

                    return $array;
                }
            );

        return inertia('leave/index', ['leaves' => $leaves]);
    }

    public function show(string $id) {}

    public function create()
    {
        $user = auth()->user();

        if ($user == null || ! $user->hasRoleLevel(RoleLevel::Employee)) {
            return redirect()->back();
        }

        return inertia('leave/create', ['types' => LeaveType::all(), 'available_days' => $user->getRemainingLeaveDays()]);
    }

    public function store(LeaveCreateRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();

        $leave = new Leave($data);

        $leave->department()->associate($user->department);
        $leave->supervisor()->associate($user->supervisor);
        $leave->requester()->associate($user);
        $leave->manager()->associate($user->department->getManager());
        $leave->type()->associate($data['type']);

        if ($leave->type->name === 'Verlof' && $leave->getAmountOfDays() > $user->getRemainingLeaveDays()) {
            return redirect()->route('leave.create', ['status' => 'failed']);
        }

        $leave->save();

        return redirect()->route('leave.create', ['status' => 'success']);
    }

    public function edit(string $id) {}

    public function update(string $id) {}

    public function destroy(string $id) {}
}
