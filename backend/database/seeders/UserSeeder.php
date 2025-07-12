<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('1234567890'),
            'role' => 1,
        ]);

        User::firstOrCreate([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => bcrypt('1234567890'),
            'role' => 2,

        ]);
    }
}
