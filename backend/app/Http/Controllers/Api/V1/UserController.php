<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Lib\Api;
use App\Repositories\UserRepository;
use Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $repo;
    public function __construct(UserRepository $repo)
    {
        $this->repo = $repo;
    }

    public function index(Request $request)
    {
        $data = [];
        [$element, $count] = $this->repo->listing();
        $data['data'] = $element;
        $data['total'] = $count;

        return Api::res($data, 'User fetched successfully', 200);
    }

    Public function store(UserRequest $request)
    {
        $data = [];
        $data['name'] = $request->name;
        $data['email'] = $request->email;
        $data['password'] = Hash::make($request['password']);

        if ($request->has('id')) {
            $user = $this->repo->find($request->id);
            if (!$user) {
                return Api::resError('User not found', null, 404);
            }
            $user->update($data);
        } else {
            $existingUser = $this->repo->findByEmail($data['email']);
            if ($existingUser) {
                return Api::resError('Email already exists', null, 400);
            }
        }

        return Api::res($user, 'User saved successfully', $request->has('id') ? 200 : 201);
    }

    public function show($id)
    {
        $user = $this->repo->find($id);
        if (!$user) {
            return Api::resError('User not found',null,  404);
        }
        return Api::res($user, 'User retrieved successfully', 200);

    }

    public function delete($ids)
    {
        $ids = explode(',', $ids);
        foreach ($ids as $id) {
            $user = $this->repo->find($id);
            if (!$user) {
                return Api::resError('User not found', null, 404);
            }
            $user->delete();

        }
        return Api::res(null, 'User deleted successfully', 200);

    }

}
