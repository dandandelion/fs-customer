<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

// Customers CRUD Operations with auto-sync
Route::post('/customers', [CustomerController::class, 'store']);
Route::put('/customers/{customer}', [CustomerController::class, 'update']);
Route::delete('/customers/{customer}', [CustomerController::class, 'destroy']);
Route::get('/customers/search', [CustomerController::class, 'search']);
