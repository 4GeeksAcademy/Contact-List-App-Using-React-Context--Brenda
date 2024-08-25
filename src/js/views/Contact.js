import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

const Contact = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchContacts();
    }, []);

    return (
        <div className="contact-list">
            {store.contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

export default Contact;
