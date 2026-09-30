<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LeaveOrderController extends Controller
{
    public function index() {
        return inertia("leave", ['types' => [ 'TYPE1', 'TYPE2', 'TYPE3', 'TYPE4' ], 'remaining_leave_days' => 67]);
    }

    public function store() {
        return redirect()->route('leave', [ 'status' => 'success' ]);
    }
}
