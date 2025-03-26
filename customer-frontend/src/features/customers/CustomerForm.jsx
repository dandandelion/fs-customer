import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { createCustomer } from "./CustomerAPI";
import { toast } from "react-hot-toast";

const CustomerForm = ({ closeModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        toast.promise(
            createCustomer(data),
            {
                loading: "Adding new customer",
                success: (res) => {
                    closeModal(res.data);
                    return "Customer added successfully"
                },
                error: "Failed to add customer",
            },
            {
                id: 'customer-add',
                position: 'top-center'
            }
        );
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    {...register("first_name", { required: "First name is required" })}
                    isInvalid={!!errors.first_name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.first_name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    {...register("last_name", { required: "Last name is required" })}
                    isInvalid={!!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.last_name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="johndoe@example.com"
                    {...register("email_address", { required: "Email is required" })}
                    isInvalid={!!errors.email_address}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email_address?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    {...register("contact_no", { required: "Phone number is required", maxLength: { value: 11, message: "Phone number is invalid" }, minLength: { value: 8, message: "Phone number is invalid" } })}
                    isInvalid={!!errors.contact_no}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.contact_no?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
                Save
            </Button>
        </Form>
    );
};

export default CustomerForm;
