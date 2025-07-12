<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $question = Question::create([
            'user_id' => 1,
            'title' => 'Sample Question Title',
            'description' => 'This is a sample question description.',
        ]);

        $tags = ['Laravel', 'PHP', 'Database'];

        foreach ($tags as $tagName) {
            Tag::firstOrCreate([
                'question_id' => $question->id,
                'name' => $tagName,
            ]);
        }

        echo "\n✅ Created question ID {$question->id} with 3 tags.\n";

    }

}
