<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Customer;
use App\Services\ElasticsearchService;
use Mockery;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $searchService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->searchService = Mockery::mock(ElasticsearchService::class);
        $this->app->instance(ElasticsearchService::class, $this->searchService);
    }

    public function test_store_creates_customer_successfully()
    {
        $this->searchService->shouldReceive('syncCustomer')->once();

        $response = $this->postJson('/api/customers', [
            'email_address' => 'test@example.com',
            'first_name'    => 'John',
            'last_name'     => 'Doe',
            'contact_no'    => '1234567890',
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'Customer created successfully',
                 ]);

        $this->assertDatabaseHas('customer', ['email_address' => 'test@example.com']);
    }

    public function test_store_fails_validation()
    {
        $response = $this->postJson('/api/customers', []);

        $response->assertStatus(422) // Unprocessable Entity
                 ->assertJsonValidationErrors(['email_address', 'first_name', 'last_name', 'contact_no']);
    }

    public function test_update_customer_successfully()
    {
        $customer = Customer::factory()->create();

        $this->searchService->shouldReceive('syncCustomer')->once();

        $response = $this->putJson("/api/customers/{$customer->id}", [
            'email_address' => 'updated@example.com',
            'first_name'    => 'Updated',
            'last_name'     => 'Name',
            'contact_no'    => '0987654321',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Customer updated successfully',
                 ]);

        $this->assertDatabaseHas('customer', ['email_address' => 'updated@example.com']);
    }

    public function test_update_fails_validation()
    {
        $customer = Customer::factory()->create();

        $response = $this->putJson("/api/customers/{$customer->id}", []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email_address', 'first_name', 'last_name', 'contact_no']);
    }

    public function test_destroy_deletes_customer_successfully()
    {
        $customer = Customer::factory()->create();

        $this->searchService->shouldReceive('deleteCustomer')->once();

        $response = $this->deleteJson("/api/customers/{$customer->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Customer deleted successfully',
                 ]);

        $this->assertDatabaseMissing('customer', ['id' => $customer->id]);
    }

    public function test_search_returns_results()
    {
        $this->searchService->shouldReceive('searchCustomers')->with('john')->andReturn([
            ['id' => 1, 'first_name' => 'John', 'last_name' => 'Doe']
        ]);

        $response = $this->getJson('/api/customers/search?query=john');

        $response->assertStatus(200)
                 ->assertJson([
                     ['id' => 1, 'first_name' => 'John', 'last_name' => 'Doe']
                 ]);
    }

    public function test_search_fails_without_query()
    {
        $response = $this->getJson('/api/customers/search');

        $response->assertStatus(400)
                 ->assertJson([
                     'message' => 'Search query is required',
                 ]);
    }
}
