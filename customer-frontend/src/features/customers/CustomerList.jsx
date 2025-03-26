import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomerSearch from "./CustomerSearch";
import CustomerForm from "./CustomerForm";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast"
import { fetchCustomers, deleteCustomer } from "./CustomerAPI";
import CustomerView from "./CustomerView";
import { PiEyeFill } from "react-icons/pi";


const CustomerList = () => {
    const [showModal, setShowModal] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [maxEntries, _setMaxEntries] = useState(10);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentSearchTerm, setCurrentSearchTerm] = useState("");

    useEffect(() => {
        initializeCustomers();
    }, []);

    const initializeCustomers = () => {
        fetchCustomers("*")
            .then((data) => {
                setCustomers(data.hits.hits);
                setFilteredCustomers(data.hits.hits);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    };

    const onCloseModal = (profile) => {
        if (profile) {
            setCustomers((prev, index) => [...prev, { _id: profile.id, _source: profile }]);
            setFilteredCustomers((prev, index) => [...prev, { _id: profile.id, _source: profile }]);
        }
        setShowModal(false);
    };

    const onSearchLocal = (event) => {
        const { value } = event.target;
        setCurrentSearchTerm(value);
        setFilteredCustomers(customers.filter((customer) =>
            customer._source.first_name.toLowerCase().includes(value.toLowerCase())
            || customer._source.last_name.toLowerCase().includes(value.toLowerCase())
            || customer._source.email_address.toLowerCase().includes(value.toLowerCase())
            || customer._source.first_name.toLowerCase().concat(" " + customer._source.last_name.toLowerCase()).includes(value.toLowerCase())
        ));
    };

    useEffect(() => {
        console.log(filteredCustomers);
    }, [filteredCustomers]);

    const onConfirmDelete = async () => {
        if (customerToDelete) {
            toast.promise(
                deleteCustomer(customerToDelete._id),
                {
                    loading: "Deleting customer",
                    success: () => {
                        setCustomers(customers.filter((c) => c._id != customerToDelete._id));
                        setFilteredCustomers(filteredCustomers.filter((c) => c._id != customerToDelete._id));
                        setCustomerToDelete(null);
                        onCloseView("deleted");
                        return "Customer deleted successully!";
                    },
                    error: (err) => {
                        console.error(err);
                        return "Failed to delete customer";
                    },
                }
            );
        }
        setShowConfirmModal(false);
    };

    const onRequestDelete = (customer) => {
        setCustomerToDelete(customer);
        setShowConfirmModal(true);
    };

    const onViewCustomer = (customer) => {
        setSelectedCustomer(customer);
    };

    const onCloseView = (updatedProfile = null) => {
        if (updatedProfile && updatedProfile !== "deleted") {
            const toUpdate = customers.find((c) => c._id == updatedProfile._id);
            if (toUpdate) {
                toUpdate._source = updatedProfile._source;
                setCustomers(customers.map((c) => c._id === updatedProfile._id ? toUpdate : c));
                setFilteredCustomers(filteredCustomers.map((c) => c._id === updatedProfile._id ? toUpdate : c));
            }
        }
        setSelectedCustomer(null);
    };

    return (
        <div className="container mt-4 d-flex flex-column" style={{ width: '100%' }}>
            {
                !selectedCustomer && <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="text-left">Customer List</h2>
                        <Button variant="primary" onClick={() => setShowModal(true)}>
                            + Add Customer
                        </Button>
                    </div>

                    <CustomerSearch persistSearchTerm={currentSearchTerm} onSearchLocal={(term) => onSearchLocal(term)} onViewCustomer={(customer) => onViewCustomer(customer)} />

                    <div className="d-flex flex-column gap-2">
                        <AnimatePresence>
                            {
                                filteredCustomers.length > 0 ? filteredCustomers.slice(0, maxEntries).sort((a, b) => a._source.first_name.localeCompare(b._source.first_name)).map((customer, i) => (
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10, filter: "blur(5px)" }} transition={{ delay: (i * 0.05) }} key={customer._id} className="">
                                        <div className="card py-2 px-3 gap-2 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                            <div className="d-flex flex-column align-items-start w-100">
                                                <h5 className="p-0 m-0">{customer._source.first_name} {customer._source.last_name}</h5>
                                                <small className="p-0 m-0 text-muted"><a className="text-purple" href={`mailto::${customer._source.email_address}`}>{customer._source.email_address}</a></small>
                                                <small className="p-0 m-0"><em>{customer._source.contact_no}</em></small>
                                            </div>
                                            <div className="d-flex flex-wrap w-100 w-md-auto justify-content-end ">
                                                <Button
                                                    variant="outline-success"
                                                    className="flex-grow-1 flex-md-grow-0 d-flex align-items-end justify-content-center gap-2"
                                                    onClick={() => onViewCustomer(customer)}
                                                >
                                                    <PiEyeFill style={{ fontSize: '1.1em' }} />
                                                </Button>
                                            </div>

                                        </div>
                                    </motion.div>
                                ))
                                    :
                                    <div className="text-center py-5">No customers found.</div>
                            }
                        </AnimatePresence>
                    </div>
                </>
            }

            {selectedCustomer && <CustomerView selectedCustomer={selectedCustomer} onRequestDelete={(customer) => onRequestDelete(customer)} onCloseView={onCloseView} />}


            {/* Modals Section */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerForm closeModal={(status) => onCloseModal(status)} />
                </Modal.Body>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this customer?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomerList;
