<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $question = Answer::create([
            'user_id' => 1,
            'question_id' => 1,
            'answer' => 'Answer to the sample question.',
        ]);

        echo "\n✅ Created answer of question id 1.\n";

    }

}
