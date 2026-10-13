<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard', []);
})->name('dashboard');

Route::get('/login', function () {
    return Inertia::render('login', []);
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});

Route::middleware('auth')->group(function () {
    Route::resource('leave', LeaveController::class);
});
