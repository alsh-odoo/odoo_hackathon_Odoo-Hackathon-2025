<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnswerRequest;
use App\Lib\Api;
use App\Repositories\AnswerRepository;

class AnswerController extends Controller
{
    protected $repo;

    public function __construct(AnswerRepository $repo)
    {
        $this->repo = $repo;
    }
    // public function index()
    // {
    //     $data = [];

    //     [$elements, $total] = $this->repo->listing();
    //     $data['data'] = $elements;
    //     $data['total'] = $total;

    //     return Api::res($data, 'Questions retrieved successfully', 200);
    // }

    public function store(AnswerRequest $request)
    {
        $data = [
            'question_id' => $request->question_id,
            'user_id' => auth()->user()->id,
            'answer' => $request->answer,
            'upvotes' => $request->upvotes ?? 0,
            'downvotes' => $request->downvotes ?? 0,
            'accepted_status' => $request->accepted_status ?? 0,
        ];

        $question = $this->repo->find($request->question_id);
        if (!$question) {
            return Api::resError('Question not found', null, 404);
        }

        $answer = $this->repo->find($request->id);
        if ($request->has('id') && $answer) {
            $answer->update($data);
        } else {
            $answer = $this->repo->create($data);
        }
        return Api::res($answer, 'Answer saved successfully', $request->has('id') ? 200 : 201);
    }

    public function show($id)
    {
        $answer = $this->repo->find($id);
        if (!$answer) {
            return Api::resError('Answer not found', null, 404);
        }
        return Api::res($answer, 'Answer retrieved successfully', 200);
    }

    public function delete($ids)
    {
        $ids = explode(',', $ids);
        foreach ($ids as $id) {
            $answer = $this->repo->find($id);
            if (!$answer) {
                return Api::resError('Answer not found', null, 404);
            }
            if ($answer->user_id != auth()->id()) {
                return Api::resError('You do not have permission to delete this answer', null, 403);
            }

            $answer->delete();

        }
        return Api::res(null, 'Answer(s) deleted successfully', 200);
    }

    public function upvote($id)
    {
        $answer = $this->repo->find($id);

        if (!$answer) {
            return Api::resError('Answer not found', null, 404);
        }

        $answer->increment('upvotes');
        return Api::res($answer, 'Upvoted successfully');
    }

    public function downvote($id)
    {
        $answer = $this->repo->find($id);

        if (!$answer) {
            return Api::resError('Answer not found', null, 404);
        }

        $answer->increment('downvotes');
        return Api::res($answer, 'Downvoted successfully');
    }

}

