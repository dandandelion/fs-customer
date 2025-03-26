<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'email_address' => $this->faker->unique()->safeEmail(),
            'first_name'    => $this->faker->firstName(),
            'last_name'     => $this->faker->lastName(),
            'contact_no'    => $this->faker->phoneNumber(),
        ];
    }
}
