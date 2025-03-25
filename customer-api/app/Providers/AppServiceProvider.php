<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\ElasticsearchService;
use App\Models\Customer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(ElasticsearchService $searchService): void
    {
        if (app()->runningInConsole()) {
            return;
        }
    
        $response = $searchService->checkIndexExists();
        
        if (!$response) {
            $searchService->createIndex();
        }
    
        // Sync all customers to Elasticsearch
        $customers = Customer::all();
        foreach ($customers as $customer) {
            $searchService->syncCustomer($customer);
        }
    }
}
