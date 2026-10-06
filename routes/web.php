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

Route::get('/leave-overview', function () {
    return Inertia::render('leave-overview', []);
});

Route::get('/leave-overview/{id}', function (int $id) {
    return Inertia::render('leave-overview', [] );
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});
