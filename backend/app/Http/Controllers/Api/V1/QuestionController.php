<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionRequest;
use App\Lib\Api;
use App\Repositories\QuestionRepository;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    protected $repo;

    public function __construct(QuestionRepository $repo)
    {
        $this->repo = $repo;
    }
    public function index()
    {
        $data = [];

        [$elements, $total] = $this->repo->listing();
        $data['elements'] = $elements;
        $data['total'] = $total;

        return Api::res($data, 'Questions retrieved successfully', 200);

    }

    Public function store(QuestionRequest $request)
    {
        $data = [];
        $data['user_id'] = $request->user_id;
        $data['title'] = $request->title;
        $data['description'] = $request->description;
        $question = $this->repo->create($data);

        return Api::res($question, 'Question created successfully', 201);
    }

    public function show($id)
    {
        $question = $this->repo->find($id);
        if (!$question) {
            return Api::resError('Question not found',null,  404);
        }
        return Api::res($question, 'Question retrieved successfully', 200);

    }

    public function delete($ids)
    {
        $ids = explode(',', $ids);
        foreach ($ids as $id) {
            $question = $this->repo->find($id);
            if (!$question) {
                return Api::resError('Question not found', null, 404);
            }
            if ($question->user_id != auth()->id()) {
                return Api::resError('You do not have permission to delete this question', null, 403);
            }
            $question->delete();

        }
        return Api::res(null, 'Question(s) deleted successfully', 200);

    }
}
