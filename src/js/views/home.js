import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

const Home = () => {
    const { store, actions } = useContext(Context);
	console.log(store.contacts)

    // Fetch contacts when the component is mounted
    useEffect(() => {
        actions.fetchContacts();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="display-4 mb-4">Welcome to the Contact Manager</h1>
            <Link to="/add-contact" className="btn btn-primary mb-4">
                Add New Contact
            </Link>
            <h2 className="mb-4">Your Contacts</h2>
            <div className="row">
               
            {store.contacts.map(contact => (
                    <div className="col-md-4 mb-4" key={contact.id}>
                        <ContactCard contact={contact} />
                    </div>                
                ))}
            </div>
        </div>
    );
};

export default Home;
