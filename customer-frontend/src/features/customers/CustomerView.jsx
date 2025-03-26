import React, { useState } from 'react'
import { TbTrashFilled } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Button, Modal } from "react-bootstrap";
import CustomerForm from './CustomerForm';

function CustomerView({ selectedCustomer, onRequestDelete, onCloseView }) {
    const [showModal, setShowModal] = useState(false);
    const [displayedCustomer, setDisplayedCustomer] = useState(selectedCustomer);

    const onDelete = (customer) => {
        onRequestDelete(customer);
    }

    const onClose = () => {
        onCloseView(displayedCustomer);
    };

    const onCloseModal = (customer) => {
        setShowModal(false);
        setDisplayedCustomer({ _id: customer.data.id, _source: customer.data });
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'relative' }} className="card mt-4 p-3 d-flex flex-column gap-4">
                <Button variant="outline-danger" style={{ top: '1em', right: '1em' }} className="position-absolute d-flex align-items-center gap-2" onClick={() => onDelete(selectedCustomer)}><TbTrashFilled style={{ fontSize: '1.1em' }} /></Button>
                <Button variant="outline-success" style={{ top: '3.2em', right: '1em' }} className="position-absolute d-flex align-items-center gap-2" onClick={() => setShowModal(true)}><FiEdit3 style={{ fontSize: '1.1em' }} /></Button>
                <h4 className="p-0 m-0">Customer Details</h4>
                <div className="d-flex flex-column flex-md-row gap-4">
                    <div className="photo d-flex justify-content-center align-items-center" style={{ overflow: 'hidden', border: '3px solid lightgray', borderRadius: '50%', width: '75px', aspectRatio: '1 / 1', alignSelf: 'center' }}>
                        <img style={{ objectFit: 'contain' }} src={`https://api.dicebear.com/9.x/initials/svg?seed=${displayedCustomer._source.first_name}`} alt="profile photo" aria-label="profile photo" />
                    </div>
                    <div className="group-items d-flex flex-column justify-content-center">
                        <p className="p-0 m-0"><strong>Full Name:</strong> {displayedCustomer._source.first_name} {displayedCustomer._source.last_name}</p>
                        <p className="p-0 m-0"><strong>Email:</strong> <a href={`mailto:${displayedCustomer._source.email_address}`}>{displayedCustomer._source.email_address}</a></p>
                        <p className="p-0 m-0"><strong>Phone:</strong> {displayedCustomer._source.contact_no}</p>
                    </div>
                </div>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </motion.div>

            {/* Reuse modal for updating */}
            {
                displayedCustomer &&
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CustomerForm closeModal={(status) => onCloseModal(status)} existingData={displayedCustomer} />
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}

export default CustomerView