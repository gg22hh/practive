import React, { useEffect, useState } from "react";
import "./EditForm.scss";

export const EditForm = ({ user, setShowForm, users, setUsers }) => {
    const [editName, setEditName] = useState(user.name);
    const [editParty, setEditParty] = useState(user.party);
    const [editOverall, setEditOverall] = useState(user.overall);
    const [editSubjects, setEditSubjects] = useState({
        subject1: user.subject1,
        subject2: user.subject2,
        subject3: user.subject3,
        subject4: user.subject4,
        subject5: user.subject5,
        subject6: user.subject6,
        subject7: user.subject7,
    });
    useEffect(() => {
        let over = 0;
        let all = 0;
        for (let i in editSubjects) {
            if (editSubjects[i]) {
                over += editSubjects[i];
                all += 1;
            }
        }
        if (all & over) {
            setEditOverall(Math.ceil(over / all));
        }
    }, [editSubjects]);
    const handleEditForm = async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            name: editName,
            party: editParty,
            overall: editOverall,
            ...editSubjects,
        };

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
                <div className="edit__top">
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
                    <div className="edit__box edit__overall">
                        <label htmlFor="overall">Общий балл</label>
                        <input
                            className="edit__box-overall"
                            value={editOverall}
                            readOnly
                            required
                            type="number"
                        />
                    </div>
                </div>
                <div className="edit__bottom">
                    <div className="edit__box">
                        <label htmlFor="subject1">Проектный практикум</label>
                        <input
                            type="number"
                            value={editSubjects.subject1}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject1: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject1"
                        />
                    </div>
                    <div className="edit__box">
                        <label htmlFor="subject2">
                            Разработка и сопровождение программных приложений
                        </label>
                        <input
                            type="number"
                            value={editSubjects.subject2}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject2: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject2"
                        />
                    </div>
                    <div className="edit__box">
                        <label htmlFor="subject3">
                            Разработка информационных систем
                        </label>
                        <input
                            type="number"
                            value={editSubjects.subject3}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject3: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject3"
                        />
                    </div>
                    <div className="edit__box">
                        <label htmlFor="subject4">
                            Методология организации и управления ИС и процессами
                        </label>
                        <input
                            type="number"
                            value={editSubjects.subject4}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject4: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject4"
                        />
                    </div>
                    <div className="edit__box">
                        <label htmlFor="subject5">Web-программирование</label>
                        <input
                            type="number"
                            value={editSubjects.subject5}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject5: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject5"
                        />
                    </div>
                    <div className="edit__box">
                        <label htmlFor="subject6">
                            ИС “1С:Торговля и склад. Предприятие”
                        </label>
                        <input
                            type="number"
                            value={editSubjects.subject6}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject6: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject6"
                        />
                    </div>
                    <div className="edit__box">
                        <label htmlFor="subject7">
                            Математические и статистические методы анализа
                            экономики
                        </label>
                        <input
                            type="number"
                            value={editSubjects.subject7}
                            onChange={(e) =>
                                setEditSubjects({
                                    ...editSubjects,
                                    subject7: parseInt(
                                        e.target.value ? e.target.value : 0
                                    ),
                                })
                            }
                            min={0}
                            max={100}
                            required
                            name="subject7"
                        />
                    </div>
                </div>
                <button className="edit__submit" type="submit">
                    Изменить
                </button>
            </form>
            <div onClick={() => setShowForm(false)} className="overlay"></div>
        </>
    );
};
