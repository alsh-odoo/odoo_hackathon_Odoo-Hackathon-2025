<?php

namespace App\Repositories;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class UserRepository
{
    protected $model;
      public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function findByEmail($email)
    {
        return $this->model->where(User::EMAIL, $email)->first();
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $data): User
    {
        return $this->model->create($data);
    }
}
