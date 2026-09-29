<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $success = Auth::attempt($data);

        if ($success) {
            activity('auth')
                ->performedOn(Auth::user())
                ->withProperties(['ip' => $request->getClientIp()])
                ->log('logged_in');

            return redirect()->route('dashboard');
        }

        return redirect()->route('login');
    }

    public function logout(Request $request): RedirectResponse
    {
        $user = Auth::user();

        if ($user) {
            Auth::logout();

            activity('auth')
                ->performedOn($user)
                ->withProperties(['ip' => $request->getClientIp()])
                ->log('logged_out');
        }

        return redirect()->route('login');
    }
}
