import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { EditForm } from "./EditForm";

export const User = ({ user, deleteUser, users, setUsers }) => {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="user">
                <div className="user__name">
                    Имя: <span>{user.name}</span>
                </div>
                <div className="user__party">
                    Группа: <span>{user.party}</span>
                </div>
                <div className="user__buttons">
                    <button onClick={() => setShowForm(true)}>
                        <EditIcon />
                    </button>
                    <button onClick={deleteUser}>
                        <DeleteForeverIcon />
                    </button>
                </div>
            </div>
            {showForm && (
                <>
                    <EditForm
                        users={users}
                        setUsers={setUsers}
                        user={user}
                        setShowForm={setShowForm}
                    />
                </>
            )}
        </>
    );
};
