import React, { useState } from "react";

export const EditForm = ({ user, setShowForm, users, setUsers }) => {
    const [editName, setEditName] = useState(user.name);
    const [editParty, setEditParty] = useState(user.party);
    const handleEditForm = async (e) => {
        e.preventDefault();

        const updatedUser = { ...user, name: editName, party: editParty };

        const response = await fetch("http://localhost:8080/api/user/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            const updatedUserFromServer = await response.json();
            setUsers(
                users?.map((user) => {
                    if (user.id === updatedUserFromServer.id) {
                        return updatedUserFromServer;
                    }

                    return user;
                })
            );
        } else {
            console.log(`Error`);
        }

        setShowForm(false);
    };
    return (
        <>
            <form onSubmit={handleEditForm} className="edit">
                <button
                    onClick={() => setShowForm(false)}
                    className="edit__close"
                >
                    &#10006;
                </button>
                <h1>Имените данные</h1>
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={editParty}
                    onChange={(e) => setEditParty(e.target.value)}
                    required
                />
                <button className="edit__submit" type="submit">
                    Изменить
                </button>
            </form>
            <div onClick={() => setShowForm(false)} className="overlay"></div>
        </>
    );
};
