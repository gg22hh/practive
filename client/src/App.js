import { useEffect, useState } from "react";
import "./App.scss";
import { User } from "./components/User";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [party, setParty] = useState("");
    const [overall, setOverall] = useState(0);
    const filtersObj = {
        name: false,
        overall: false,
        party: false,
    };
    const [filters, setFilters] = useState(filtersObj);
    const [subjects, setSubjects] = useState({
        subject1: 0,
        subject2: 0,
        subject3: 0,
        subject4: 0,
        subject5: 0,
        subject6: 0,
        subject7: 0,
    });
    const [showSubjects, setShowSubjects] = useState(false);

    useEffect(() => {
        let over = 0;
        let all = 0;
        for (let i in subjects) {
            if (subjects[i]) {
                over += subjects[i];
                all += 1;
            }
        }
        if (all & over) {
            setOverall(Math.ceil(over / all));
        }
    }, [subjects]);

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

    const addUser = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, party, overall, ...subjects }),
        });

        if (response.ok) {
            const newUser = await response.json();
            setUsers([...users, newUser]);
        } else {
            console.log("error");
        }

        setName("");
        setParty("");
        setOverall(0);
        setSubjects({
            subject1: 0,
            subject2: 0,
            subject3: 0,
            subject4: 0,
            subject5: 0,
            subject6: 0,
            subject7: 0,
        });
        setShowSubjects(false);
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
                <form onSubmit={addUser} className="app__form">
                    <h1>Введите данные</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя"
                        required
                    />
                    <input
                        type="text"
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                        placeholder="Введите группу"
                        required
                    />
                    <div className="app__form-box overall">
                        <label
                            onClick={() => setShowSubjects(!showSubjects)}
                            htmlFor="overall"
                        >
                            Общий рейтинг
                            <div
                                className={
                                    showSubjects ? "arrow active" : "arrow"
                                }
                            >
                                <ArrowRightIcon />
                            </div>
                        </label>
                        <input
                            type="number"
                            readOnly
                            value={overall}
                            placeholder="Введите группу"
                            required
                            name="overall"
                        />
                    </div>
                    {showSubjects && (
                        <>
                            <div className="app__form-box">
                                <label htmlFor="subject1">
                                    Проектный практикум
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject1}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject1: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject1"
                                />
                            </div>
                            <div className="app__form-box">
                                <label htmlFor="subject2">
                                    Разработка и сопровождение программных
                                    приложений
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject2}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject2: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject2"
                                />
                            </div>
                            <div className="app__form-box">
                                <label htmlFor="subject3">
                                    Разработка информационных систем
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject3}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject3: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject3"
                                />
                            </div>
                            <div className="app__form-box">
                                <label htmlFor="subject4">
                                    Методология организации и управления ИС и
                                    процессами
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject4}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject4: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject4"
                                />
                            </div>
                            <div className="app__form-box">
                                <label htmlFor="subject5">
                                    Web-программирование
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject5}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject5: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject5"
                                />
                            </div>
                            <div className="app__form-box">
                                <label htmlFor="subject6">
                                    ИС “1С:Торговля и склад. Предприятие”
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject6}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject6: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject6"
                                />
                            </div>
                            <div className="app__form-box">
                                <label htmlFor="subject7">
                                    Математические и статистические методы
                                    анализа экономики
                                </label>
                                <input
                                    type="number"
                                    value={subjects.subject7}
                                    onChange={(e) =>
                                        setSubjects({
                                            ...subjects,
                                            subject7: parseInt(
                                                e.target.value
                                                    ? e.target.value
                                                    : 0
                                            ),
                                        })
                                    }
                                    min={0}
                                    max={100}
                                    required
                                    name="subject7"
                                />
                            </div>
                        </>
                    )}

                    <button>Добавить</button>
                </form>
                <div className="app__sort">
                    <div className="app__sort-title">Сортировка</div>
                    <div className="app__sort-buttons">
                        <button
                            className={
                                filters.name ? "button active" : "button"
                            }
                            onClick={() =>
                                setFilters({ ...filtersObj, name: true })
                            }
                        >
                            Имя
                        </button>
                        <button
                            className={
                                filters.party ? "button active" : "button"
                            }
                            onClick={() =>
                                setFilters({ ...filtersObj, party: true })
                            }
                        >
                            Группа
                        </button>
                        <button
                            className={
                                filters.overall ? "button active" : "button"
                            }
                            onClick={() =>
                                setFilters({ ...filtersObj, overall: true })
                            }
                        >
                            Балл
                        </button>
                    </div>
                </div>
                <div className="app__list">{usersList}</div>
            </div>
        </div>
    );
}

export default App;
