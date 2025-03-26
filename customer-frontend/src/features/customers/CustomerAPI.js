const API_URL = import.meta.env.VITE_API_URL;

export async function fetchCustomers(term) {
    try {

        const response = await fetch(`${API_URL}/customers/search?query=${term}`);
        if (!response.ok) {
            throw new Error("Failed to fetch customers");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
}

export async function createCustomer(customerData) {
    try {
        const response = await fetch(`${API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });

        if (!response.ok) {
            throw new Error("Failed to create customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating customer:", error);
        return null;
    }
}

export async function updateCustomer(customerId, customerData) {
    try {
        const response = await fetch(`${API_URL}/customers/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });

        if (!response.ok) {
            throw new Error("Failed to update customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating customer:", error);
        return null;
    }
}

export async function deleteCustomer(customerId) {
    try {
        const response = await fetch(`${API_URL}/customers/${customerId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Failed to delete customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting customer:", error);
        return null;
    }
}