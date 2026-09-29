<?php

use App\Http\Controllers\AuthController;
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
});
