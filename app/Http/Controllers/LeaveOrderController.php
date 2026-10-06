<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveOrderRequest;

class LeaveOrderController extends Controller
{
    public function index()
    {
        return inertia('leave', ['types' => ['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4'], 'remaining_leave_days' => 67]);
    }

    public function store(LeaveOrderRequest $request)
    {
        $data = $request->validated();

        return redirect()->route('leave', ['status' => 'success']);
    }
}
