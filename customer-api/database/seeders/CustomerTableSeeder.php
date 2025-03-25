<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customer')->insert([
            [
                'email_address' => 'test@example.com',
                'first_name' => 'John',
                'last_name' => 'Doe',
                'contact_no' => '1234567890',
            ],
            [
                'email_address' => 'test2@example.com',
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'contact_no' => '9876543210',
            ],
        ]);
    }
}
