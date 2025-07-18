<?php

namespace App\Repositories;
use App\Models\User;

class UserRepository
{
    protected $model;
      public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function tableName()
    {
        return User::TABLE_NAME;
    }

    public function modelQuery()
    {
        return User::query();
    }

    public function query()
    {
        $selections = [
            $this->tableName() . '.*',
        ];

        $model = $this->modelQuery()->select($selections);
        if (request('search')) {
            $model->where(function ($query) {
                $search = request('search');
                $query->orWhere($this->tableName() . '.' . User::NAME, 'like', "%{$search}%");
            });
        }
        return $model;
    }

    public function listing()
    {
        return [$this->query()->get(), $this->query()->count()];
    }

    public function findByEmail($email)
    {
        return $this->model->where(User::EMAIL, $email)->first();
    }

    public function create(array $data): User
    {
        return $this->modelQuery()->create($data);
    }

    public function find($id): ?User
    {
        return $this->modelQuery()->find($id);
    }
}
