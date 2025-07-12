<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Lib\Api;
use Illuminate\Support\Facades\Route;

Route::get('/test-api', function () {
    return Api::res([], 'Test API is working!', 200);
});

Route::prefix('v1')->group(function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::get('user', [UserController::class, 'index']);

});




