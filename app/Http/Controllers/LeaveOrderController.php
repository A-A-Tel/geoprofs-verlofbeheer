<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveOrderRequest;
use App\Models\Leave;

class LeaveOrderController extends Controller
{
    public function index()
    {
        return inertia('leave', ['types' => ['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4'], 'remaining_leave_days' => 67]);
    }

    public function store(LeaveOrderRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();

        $leave = Leave::create($data);

        $leave->requester()->associate($user);
        $leave->supervisor()->associate($user->supervisor);
        $leave->manager()->associate($user->department->manager);
        $leave->type()->associate($data['type']);

        $leave->save();


        return redirect()->route('leave', ['status' => 'success']);
    }
}
