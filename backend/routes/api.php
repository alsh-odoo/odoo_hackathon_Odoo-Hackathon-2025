<?php

use App\Http\Controllers\Api\V1\AnswerController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\QuestionController;
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
    Route::put('user/save', [UserController::class, 'store']);
    Route::get('user/{id}', [UserController::class, 'show']);
    Route::delete('user/{id}', [UserController::class, 'delete']);

    Route::get('question', [QuestionController::class, 'index']);
    Route::post('question/save', [QuestionController::class, 'store']);
    Route::get('question/{id}', [QuestionController::class, 'show']);
    Route::delete('question/{ids}', [QuestionController::class, 'delete']);

    // Route::get('answers', [QuestionController::class, 'index']);
    Route::post('answers/save', [QuestionController::class, 'store']);
    Route::get('answers/{id}', [QuestionController::class, 'show']);
    Route::delete('answers/{ids}', [QuestionController::class, 'delete']);
    Route::post('answers/{id}/upvote', [AnswerController::class, 'upvote']);
    Route::post('answers/{id}/downvote', [AnswerController::class, 'downvote']);


});




