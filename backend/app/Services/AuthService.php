<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    protected $repo;
    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }

    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = $this->repo->create($data);

        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(array $credentials)
    {
        $user = $this->repo->findByEmail($credentials['email']);
        // return $user;

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return [
                'error' => 'The provided credentials are incorrect.'
            ];
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }
}
