<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Lib\Api;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $service;
    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }
    public function register(UserRequest $request)
    {
        $request->validated();
        $user = $this->service->register($request->all());

        return Api::res($user, 'User registered successfully', 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($request->email == null || $request->password == null) {
            return Api::resError( 'Email and password are required', null, 400);
        }

        $user = $this->service->login($credentials);
        if (!$user || isset($user['error'])) {
            return Api::resError(null, $user['error'] ?? 'Invalid credentials', 401);
        }
        return Api::res($user, 'User logged in successfully', 200);
    }
}
