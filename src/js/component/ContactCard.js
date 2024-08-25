import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        actions.deleteContact(contact.id);
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

  
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">{contact.email}</p>
                <p className="card-text">{contact.phone}</p>
                <p className="card-text">{contact.address}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/edit-contact/${contact.id}`} className="btn btn-primary">
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="close" aria-label="Close" onClick={cancelDelete}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this contact?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={confirmDelete} className="btn btn-danger">
                                    Yes
                                </button>
                                <button onClick={cancelDelete} className="btn btn-secondary">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactCard;