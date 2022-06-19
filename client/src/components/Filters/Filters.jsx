import React from "react";
import "./Filters.scss";

export const Filters = ({ filters, setFilters, filtersObj }) => {
    return (
        <div className="app__sort">
            <div className="app__sort-title">Сортировка</div>
            <div className="app__sort-buttons">
                <button
                    className={filters.name ? "button active" : "button"}
                    onClick={() => setFilters({ ...filtersObj, name: true })}
                >
                    Имя
                </button>
                <button
                    className={filters.party ? "button active" : "button"}
                    onClick={() => setFilters({ ...filtersObj, party: true })}
                >
                    Группа
                </button>
                <button
                    className={filters.overall ? "button active" : "button"}
                    onClick={() => setFilters({ ...filtersObj, overall: true })}
                >
                    Балл
                </button>
            </div>
        </div>
    );
};
