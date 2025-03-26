import React from 'react'
import CustomerList from '../features/customers/CustomerList'

function CustomerPage() {
    return (
        <div className='d-flex flex-column align-items-start mt-4' style={{ position: 'relative', minWidth: '300px', width: '60svw', maxWidth: '600px' }}>
            <h1 className='m-0 p-0 text-left'>Customers Page</h1>
            <hr />
            <CustomerList />
        </div>
    )
}

export default CustomerPage