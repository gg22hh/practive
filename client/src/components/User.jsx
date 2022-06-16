import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { EditForm } from "./EditForm";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const User = ({ user, deleteUser, users, setUsers, position }) => {
    const [showForm, setShowForm] = useState(false);
    const [showSubjects, setShowSubjects] = useState(false);

    return (
        <>
            <div className="user">
                <div className="user__top">
                    <div className="user__name">
                        {position}. {user.name}
                    </div>
                    <div className="user__party">{user.party}</div>
                    <div className="user__overall">{user.overall}</div>
                    <div className="user__buttons">
                        <button onClick={() => setShowForm(true)}>
                            <EditIcon />
                        </button>
                        <button onClick={deleteUser}>
                            <DeleteForeverIcon />
                        </button>
                        <button
                            onClick={() => setShowSubjects(!showSubjects)}
                            className={showSubjects ? "arrow active" : "arrow"}
                        >
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
                {showSubjects && (
                    <ul className="user__bottom">
                        <li>
                            <span>Проектный практикум: </span>
                            <span>{user.subject1}</span>
                        </li>
                        <li>
                            <span>
                                Разработка и сопровождение программных
                                приложений:
                            </span>
                            <span>{user.subject2}</span>
                        </li>
                        <li>
                            <span>Разработка информационных систем:</span>
                            <span>{user.subject3}</span>
                        </li>
                        <li>
                            <span>
                                Методология организации и управления ИС и
                                процессами:
                            </span>
                            <span>{user.subject4}</span>
                        </li>
                        <li>
                            <span>Web-программирование:</span>
                            <span>{user.subject5}</span>
                        </li>
                        <li>
                            <span>ИС “1С:Торговля и склад. Предприятие”: </span>
                            <span>{user.subject6}</span>
                        </li>
                        <li>
                            <span>
                                Математические и статистические методы анализа
                                экономики:
                            </span>
                            <span>{user.subject7}</span>
                        </li>
                    </ul>
                )}
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
