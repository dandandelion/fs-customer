<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Customer;

class ElasticsearchService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('ELASTICSEARCH_HOST', 'http://searcher:9200');
    }

    /**
     * Sync customer data to Elasticsearch
     */
    public function syncCustomer(Customer $customer)
    {
        $url = "{$this->baseUrl}/customers/_doc/{$customer->id}";

        return Http::put($url, [
            'email_address' => $customer->email_address,
            'first_name'    => $customer->first_name,
            'last_name'     => $customer->last_name,
            'contact_no'    => $customer->contact_no,
            'created_at'    => $customer->created_at,
            'updated_at'    => $customer->updated_at,
        ]);
    }

    /**
     * Delete customer from Elasticsearch
     */
    public function deleteCustomer(int $customerId)
    {
        $url = "{$this->baseUrl}/customers/_doc/{$customerId}";
        return Http::delete($url);
    }

    /**
     * Search for customers by name or email
     */
    public function searchCustomers(string $query)
    {
        $url = "{$this->baseUrl}/customers/_search";

        $response = Http::post($url, [
            'query' => [
                'multi_match' => [
                    'query'  => $query,
                    'fields' => ['first_name', 'last_name', 'email_address'],
                ]
            ]
        ]);

        return $response->json();
    }
}
