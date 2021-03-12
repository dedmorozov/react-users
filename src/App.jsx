import React, { useState, useEffect } from 'react';
import { UsersList } from './components/UsersList/UsersList';
import { loadUsers } from './api/api';
import './App.scss';

const initialValues = {
  nameQuery: '',
  lastnameQuery: '',
  ageQuery: '',
};

export const App = () => {
  const [usersList, changeUsersList] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [isMaleChecked, setIsMaleChecked] = useState(true);
  const [isFemaleChecked, setIsFemaleChecked] = useState(true);

  useEffect(async() => {
    const users = await loadUsers();

    changeUsersList(users);
  }, []);

  const {
    nameQuery,
    lastnameQuery,
    ageQuery,
  } = values;

  const filled = nameQuery
  || lastnameQuery
  || ageQuery
  || !isMaleChecked
  || !isFemaleChecked;

  const filteredUsers = (users) => {
    let filtered = [...users];

    if (nameQuery) {
      filtered = filtered.filter(user => (
        user.name.toLowerCase().includes(
          nameQuery.toLowerCase(),
        )
      ));
    }

    if (lastnameQuery) {
      filtered = filtered.filter(user => (
        user.lastname.toLowerCase().includes(
          lastnameQuery.toLowerCase(),
        )
      ));
    }

    if (ageQuery) {
      filtered = filtered.filter(user => (
        user.age.toString().toLowerCase().includes(
          ageQuery.toLowerCase(),
        )
      ));
    }

    if (!isFemaleChecked) {
      filtered = filtered.filter(user => user.sex === 'm');
    }

    if (!isMaleChecked) {
      filtered = filtered.filter(user => user.sex === 'f');
    }

    return filtered;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetFilter = () => {
    setValues(initialValues);
    setIsMaleChecked(true);
    setIsFemaleChecked(true);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header__filter">
          <input
            type="text"
            className="header__input"
            placeholder="Search by name"
            name="nameQuery"
            value={nameQuery}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="header__input"
            placeholder="Search by lastname"
            name="lastnameQuery"
            value={lastnameQuery}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="header__input"
            placeholder="Search by age"
            name="ageQuery"
            value={ageQuery}
            onChange={handleInputChange}
          />

          <div className="header__checkboxes">
            <label>
              <input
                type="checkbox"
                value="m"
                onClick={() => setIsMaleChecked(!isMaleChecked)}
                checked={isMaleChecked}
                onChange={() => {}}
              />
              <p>Мужской</p>
            </label>
            <label>
              <input
                type="checkbox"
                value="f"
                onClick={() => setIsFemaleChecked(!isFemaleChecked)}
                checked={isFemaleChecked}
                onChange={() => {}}
              />
              <p>Женский</p>
            </label>
          </div>
        </div>

        <div className="header__button">
          {filled
          && (
            <button
              type="button"
              onClick={resetFilter}
            >
              Reset filter
            </button>
          )
          }
        </div>
      </div>

      <UsersList users={filteredUsers(usersList)} />
    </div>
  );
};
