const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [
                {
                    id: 1,
                    full_name: "Mike Anamendolla",
                    email: "mike.ana@example.com",
                    phone: "(870) 288-4149",
                    address: "5842 Hillcrest Rd"
                },
                // Otros contactos de ejemplo...
            ],
        },
        actions: {
            // Fetch all contacts
            fetchContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/brenda/contacts');
					if (response.status==404)
					{fetch('https://playground.4geeks.com/contact/agendas/brenda',{method:'POST'})}
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (error) {
                    console.error('Error fetching contacts:', error);
                }
            },

            // Create a new contact
            createContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/brenda/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        const newContact = await response.json();
                        const store = getStore();
                        setStore({ contacts: [...store.contacts, newContact] });
                    }
                } catch (error) {
                    console.error('Error creating contact:', error);
                }
            },

            // Update an existing contact
            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/brenda/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedContact)
                    });
                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.map(contact => 
                            contact.id === parseInt(id) ? updatedContact : contact
                        );
                        setStore({ contacts: updatedContacts });
                    }
                } catch (error) {
                    console.error('Error updating contact:', error);
                }
            },

            // Delete a contact
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/brenda/contacts/${id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: updatedContacts });
                    }
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        }
    };
};

export default getState;
