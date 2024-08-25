import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
    const { actions, store } = useContext(Context);
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const existingContact = store.contacts.find(contact => contact.id === parseInt(id));
            if (existingContact) {
                setContact(existingContact);
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            actions.updateContact(id, contact);
        } else {
            actions.createContact(contact);
        }
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Full Name" />
            <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email" />
            <input type="tel" name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={contact.address} onChange={handleChange} placeholder="Address" />
            <button type="submit">{id ? "Update Contact" : "Add Contact"}</button>
        </form>
    );
};

export default AddContact;
