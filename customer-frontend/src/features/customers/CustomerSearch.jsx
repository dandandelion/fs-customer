import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { fetchCustomers } from "./CustomerAPI";

const CustomerSearch = ({ onSearchLocal, onViewCustomer }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [apiResults, setApiResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (searchTerm.length < 2) {
            setApiResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetchApiResults(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchApiResults = async (query) => {
        console.log(query);
        fetchCustomers(query).then((customers) => {
            console.log(customers);
            setApiResults(customers.hits.hits);
        });
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        onSearchLocal(e);
    };

    const handleSelect = (customer) => {
        onViewCustomer(customer);
        setShowSuggestions(false);
    };

    return (
        <div className="position-relative">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text h-100" id="basic-addon1">
                        <CiSearch />
                    </span>
                </div>
                <input
                    type="search"
                    name="search-customers"
                    id="search-customers"
                    placeholder="Start typing..."
                    className="form-control"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
            </div>

            {/* Floating Suggestions Dropdown */}
            {showSuggestions && apiResults.length > 0 && (
                <ul className="list-group position-absolute w-100 shadow bg-white z-index-100" style={{ zIndex: 9999 }}>
                    {apiResults.map((customer) => (
                        <li
                            key={customer._id}
                            style={{ cursor: "pointer" }}
                            className="list-group-item list-group-item-action"
                            onMouseDown={() => handleSelect(customer)}
                        >
                            <div className="d-flex flex-column">
                                <span><strong>{customer._source.first_name} {customer._source.last_name}</strong></span>
                                <small className="text-muted"><em>{customer._source.email_address}</em></small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerSearch;
