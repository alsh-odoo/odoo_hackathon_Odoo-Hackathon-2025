<?php

namespace App\Repositories;
use App\Models\Question;

class QuestionRepository
{
    public function tableName()
    {
        return Question::TABLE_NAME;
    }

    public function modelQuery()
    {
        return Question::query();
    }

    public function query($paginate = false)
    {
        $selections = [
            $this->tableName() . '.*',
        ];

        $model = $this->modelQuery()->select($selections);
        if (request('search')) {
            $model->where(function ($query) {
                $search = request('search');
                $query->orWhere($this->tableName() . '.' . Question::TITLE, 'like', "%{$search}%");
            });
        }
        return $model;
    }

    public function listing()
    {
        return [$this->query(true)->get(), $this->query()->count()];
    }

    public function create(array $data): Question
    {
        return $this->modelQuery()->create($data);
    }

    public function find($id): ?Question
    {
        return $this->modelQuery()->find($id);
    }


}
