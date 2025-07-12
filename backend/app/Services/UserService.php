<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $repo;
    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        return $this->repo->all();
    }

    public function createUser(array $data): User
    {
       return $this->repo->create([
            User::NAME => $data[User::NAME],
            User::EMAIL => $data[User::EMAIL],
            User::PASSWORD => Hash::make($data[User::PASSWORD]),
            User::ROLE => $data[User::ROLE] ?? 2,
        ]);
    }
}
