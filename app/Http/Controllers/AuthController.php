<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(LoginRequest $request): RedirectResponse
    {
        Log::emergency('test');
        $data = $request->validated();
        $success = auth()->attempt($data);

        if ($success) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('login');
    }
}
