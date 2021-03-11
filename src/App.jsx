import React, { useState, useEffect } from 'react';
import { UsersList } from './components/UsersList/UsersList';
import './App.scss';

export const App = () => {
  const [usersList, changeUsersList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [lastnameQuery, setLastnameQuery] = useState('');
  const [ageQuery, setAgeQuery] = useState('');
  const [isMaleChecked, setIsMaleChecked] = useState(true);
  const [isFemaleChecked, setIsFemaleChecked] = useState(true);

  useEffect(async() => {
    const users = await loadUsers();

    changeUsersList(users);
  }, []);

  const loadUsers = async() => {
    const response = await fetch(`https://venbest-test.herokuapp.com/`);

    return response.json();
  };

  const filled = nameQuery
  || lastnameQuery
  || ageQuery
  || !isMaleChecked
  || !isFemaleChecked;

  const filteredUsers = () => {
    let filtered = usersList;

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

  const resetFilter = () => {
    setNameQuery('');
    setLastnameQuery('');
    setAgeQuery('');
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
            value={nameQuery}
            onChange={(e) => {
              setNameQuery(e.target.value);
            }}
          />
          <input
            type="text"
            className="header__input"
            placeholder="Search by lastname"
            value={lastnameQuery}
            onChange={(e) => {
              setLastnameQuery(e.target.value);
            }}
          />
          <input
            type="text"
            className="header__input"
            placeholder="Search by age"
            value={ageQuery}
            onChange={(e) => {
              setAgeQuery(e.target.value);
            }}
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
          && <button type="button" onClick={resetFilter}>Reset filter</button>}
        </div>
      </div>

      <UsersList users={filteredUsers()} />
    </div>
  );
};
