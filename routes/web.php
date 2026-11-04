<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/login', function () {
    return Inertia::render('login', []);
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard', []);
    })->name('dashboard');
    Route::resource('leave', LeaveController::class);
    Route::resource('user', UserController::class);
});
