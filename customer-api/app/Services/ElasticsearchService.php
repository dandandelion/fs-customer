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

    public function checkIndexExists(): bool
    {
        $url = "{$this->baseUrl}/customers";
        $response = Http::head($url);

        return $response->successful();
    }

    public function createIndex()
    {
        $url = "{$this->baseUrl}/customers";

        $body = [
            'settings' => [
                'number_of_shards' => 1,
                'number_of_replicas' => 1
            ],
            'mappings' => [
                'properties' => [
                    'email_address' => ['type' => 'keyword'],
                    'first_name'    => ['type' => 'text'],
                    'last_name'     => ['type' => 'text'],
                    'contact_no'    => ['type' => 'keyword'],
                    'created_at'    => ['type' => 'date'],
                    'updated_at'    => ['type' => 'date'],
                ]
            ]
        ];

        return Http::put($url, $body);
    }

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

    public function deleteCustomer(int $customerId)
    {
        $url = "{$this->baseUrl}/customers/_doc/{$customerId}";
        return Http::delete($url);
    }

    public function searchCustomers(string $query)
    {
        $url = "{$this->baseUrl}/customers/_search";

        $queryBody = ($query === "*") ? 
            ["query" => ["match_all" => (object)[]]] :
            ["query" => [
                "multi_match" => [
                    "query"  => $query,
                    "fields" => ["first_name", "last_name", "email_address"],
                    "fuzziness" => "AUTO",
                    "operator"  => "and"
                ]
            ]];

        $response = Http::post($url, $queryBody);

        return $response->json();
    }
}
