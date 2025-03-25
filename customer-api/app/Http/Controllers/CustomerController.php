<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Services\ElasticsearchService;

class CustomerController extends Controller
{
    protected $searchService;

    public function __construct(ElasticsearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email_address' => 'required|email|unique:customer,email_address',
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'contact_no'    => 'required|string|max:15',
        ]);

        $customer = Customer::create($validated);

        $this->searchService->syncCustomer($customer);

        return response()->json(['message' => 'Customer created successfully', 'data' => $customer], 201);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'email_address' => "required|email|unique:customer,email_address,{$customer->id}",
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'contact_no'    => 'required|string|max:15',
        ]);

        $customer->update($validated);

        $this->searchService->syncCustomer($customer);

        return response()->json(['message' => 'Customer updated successfully', 'data' => $customer]);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        $this->searchService->deleteCustomer($customer->id);

        return response()->json(['message' => 'Customer deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json(['message' => 'Search query is required'], 400);
        }

        $results = $this->searchService->searchCustomers($query);

        return response()->json($results);
    }
}
