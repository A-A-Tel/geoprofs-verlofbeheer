<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveOrderRequest;
use App\Models\Leave;
use App\RoleLevel;

class LeaveOrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user == null || !$user->hasRoleLevel(RoleLevel::Employee)) redirect()->back();

        return inertia('leave', ['types' => ['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4'], 'remaining_leave_days' => $user->getRemainingLeaveDays()]);
    }

    public function store(LeaveOrderRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();

        $leave = Leave::create($data);

        if ($leave->getAmountOfDays() > $user->getRemainingLeaveDays()) {
            return redirect()->route('leave', ['status' => 'failed']);
        }

        $leave->requester()->associate($user);
        $leave->supervisor()->associate($user->supervisor);
        $leave->manager()->associate($user->department->getManager());
        $leave->type()->associate($data['type']);

        $leave->save();


        return redirect()->route('leave', ['status' => 'success']);
    }
}
