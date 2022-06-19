import { useEffect, useState } from "react";
import "./App.scss";
import { AddUserForm } from "./components/AddUserForm/AddUserForm";
import { Filters } from "./components/Filters/Filters";
import { User } from "./components/User/User";

function App() {
    const [users, setUsers] = useState([]);
    const filtersObj = {
        name: false,
        overall: false,
        party: false,
    };
    const [filters, setFilters] = useState(filtersObj);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/user");
                const json = await response.json();
                if (filters.name) {
                    const updatedJson = json.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        } else if (nameA > nameB) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    setUsers(updatedJson);
                }
                if (filters.party) {
                    const updatedJson = json.sort((a, b) => {
                        const partyA = a.party.toLowerCase();
                        const partyB = b.party.toLowerCase();
                        if (partyA < partyB) {
                            return -1;
                        } else if (partyA > partyB) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    setUsers(updatedJson);
                }
                if (filters.overall) {
                    setUsers(
                        json.sort((a, b) => a.overall - b.overall).reverse()
                    );
                }

                setUsers(json);
            } catch (err) {
                console.error(err.message);
            }
        };
        getUsers();
    }, [filters]);

    const deleteUser = async (id) => {
        const areYouSure = window.confirm("Are you sure?");
        if (areYouSure) {
            const response = await fetch(
                "http://localhost:8080/api/user/" + id,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setUsers(users.filter((post) => post.id !== id));
            } else {
                console.log(`${response.status} - ${response.statusText}`);
            }
        }
    };

    const usersList = users?.map((user, index) => {
        return (
            <User
                key={user.id}
                position={index + 1}
                user={user}
                deleteUser={() => deleteUser(user.id)}
                users={users}
                setUsers={setUsers}
            />
        );
    });

    return (
        <div className="app">
            <div className="container">
                <AddUserForm users={users} setUsers={setUsers} />
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                    filtersObj={filtersObj}
                />
                <div className="app__list">{usersList}</div>
            </div>
        </div>
    );
}

export default App;
