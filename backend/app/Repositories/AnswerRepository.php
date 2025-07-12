<?php

namespace App\Repositories;
use App\Models\Answer;

class AnswerRepository
{
    public function tableName()
    {
        return Answer::TABLE_NAME;
    }

    public function modelQuery()
    {
        return Answer::query();
    }

    public function query()
    {
        $selections = [
            $this->tableName() . '.*',
        ];

        $model = $this->modelQuery()->select($selections)->with('user', 'question');
        if (request('search')) {
            $model->where(function ($query) {
                $search = request('search');
                $query->orWhere($this->tableName() . '.' . Answer::ANSWER, 'like', "%{$search}%");
            });
        }
        return $model;
    }

    public function listing()
    {
        return [$this->query()->get(), $this->query()->count()];
    }

    public function create(array $data): Answer
    {
        return $this->modelQuery()->create($data);
    }

    public function find($id): ?Answer
    {
        return $this->modelQuery()->with('question')->find($id);
    }


}
