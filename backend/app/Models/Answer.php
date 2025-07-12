<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    const TABLE_NAME = 'answers';
    const QUESTION_ID = 'question_id';
    const ANSWER = 'answer';
    const USER_ID = 'user_id';
    const UPVOTES = 'upvotes';
    const DOWNVOTES = 'downvotes';
    const ACCEPTED_STATUS = 'accepted_status';

    protected $fillable = [
        self::USER_ID,
        self::QUESTION_ID,
        self::ANSWER,
        self::UPVOTES,
        self::DOWNVOTES,
        self::ACCEPTED_STATUS,
    ];


    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
