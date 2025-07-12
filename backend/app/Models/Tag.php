<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    const TABLE_NAME = 'tags';
    const QUESTION_ID = 'question_id';
    const NAME = 'name';

    protected $fillable = [
        self::QUESTION_ID,
        self::NAME,
    ];

    public function questions()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }


}
