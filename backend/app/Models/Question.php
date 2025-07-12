<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    const TABLE_NAME = 'questions';
    const TITLE = 'title';
    const DESCRIPTION = 'description';
    const USER_ID = 'user_id';
    const STATUS = 'status';

    protected $fillable = [
        self::USER_ID,
        self::TITLE,
        self::DESCRIPTION,
        self::STATUS,
    ];

    public function tags()
    {
        return $this->hasMany(Tag::class, 'question_id', 'id');
    }


}
