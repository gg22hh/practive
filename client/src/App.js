import { useEffect, useState } from "react";
import "./App.scss";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [party, setParty] = useState("");

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/user");
            const json = await response.json();

            setUsers(json);
        } catch (err) {
            console.error(err.message);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, party }),
        });

        if (response.ok) {
            const newUser = await response.json();
            setUsers([...users, newUser]);
        } else {
            console.log("error");
        }

        setName("");
        setParty("");
    };

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

    const usersList = users?.map((user) => {
        return (
            <div className="user" key={user.id}>
                <button onClick={() => deleteUser(user.id)}>&#10006;</button>
                <div className="user__name">
                    Имя: <span>{user.name}</span>
                </div>
                <div className="party">
                    Группа: <span>{user.party}</span>
                </div>
            </div>
        );
    });

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="app">
            <div className="container">
                <form onSubmit={addUser} className="app__form">
                    <h1>Введите данные</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя"
                    />
                    <input
                        type="text"
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                        placeholder="Введите группу"
                    />
                    <button>Добавить</button>
                </form>
                <div className="app__list">{usersList}</div>
            </div>
        </div>
    );
}

export default App;
