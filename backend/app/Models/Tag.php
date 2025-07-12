<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    const TABLE_NAME = 'tags';
    const NAME = 'name';

    protected $fillable = [
        self::NAME,
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'tags');
    }

}
