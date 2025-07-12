<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionRequest;
use App\Lib\Api;
use App\Models\Tag;
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
        $data['data'] = $elements;
        $data['total'] = $total;

        return Api::res($data, 'Questions retrieved successfully', 200);

    }

    public function store(QuestionRequest $request)
    {
        $data = [
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
        ];

        if ($request->has('id')) {
            $question = $this->repo->find($request->id);
            if (!$question) {
                return Api::resError('Question not found', null, 404);
            }

            $question->update($data);
            $question->tags()->delete();
        } else {
            $question = $this->repo->create($data);
        }

        if ($request->filled('tags') && is_array($request->tags)) {
            info("question tags: " . json_encode($request->tags));
            info("question ");
            info($question->id);
            foreach ($request->tags as $tagName) {
                Tag::create([
                    'question_id' => $question->id,
                    'name' => $tagName,
                ]);
            }
        }

        return Api::res($question->load('tags'), 'Question saved successfully', $request->has('id') ? 200 : 201);
    }


    public function show($id)
    {
        $question = $this->repo->find($id);
        if (!$question) {
            return Api::resError('Question not found', null, 404);
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

            Tag::where('question_id', $question->id)->delete();
            $question->delete();

        }
        return Api::res(null, 'Question(s) deleted successfully', 200);

    }
}
