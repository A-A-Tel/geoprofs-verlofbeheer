<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveOrderRequest;
use App\Models\Leave;
use App\Models\LeaveType;
use App\RoleLevel;
use Illuminate\Support\Facades\Log;

class LeaveOrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user == null || ! $user->hasRoleLevel(RoleLevel::Employee)) {
            return redirect()->back();
        }
        return inertia('leave', ['types' => LeaveType::all(), 'available_days' => $user->getRemainingLeaveDays()]);
    }

    public function store(LeaveOrderRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();

        $leave = new Leave($data);

        $leave->requester()->associate($user);
        $leave->supervisor()->associate($user->supervisor);
        $leave->manager()->associate($user->department->getManager());
        $leave->type()->associate($data['type']);

        if ($leave->type->name === 'Verlof' && $leave->getAmountOfDays() > $user->getRemainingLeaveDays()) {
            return redirect()->route('leave', ['status' => 'failed']);
        }

        Log::warning($leave->start_on);
        $leave->save();

        return redirect()->route('leave', ['status' => 'success']);
    }
}
