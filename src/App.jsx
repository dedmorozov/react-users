/* eslint-disable no-mixed-operators */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { UsersList } from './components/UsersList/UsersList';
import './App.scss';

export const App = () => {
  const [usersList, changeUsersList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [lastnameQuery, setLastnameQuery] = useState('');
  const [ageQuery, setAgeQuery] = useState('');
  // const [isChosenSex, setChosenSex] = useState(false);

  useEffect(async() => {
    const users = await loadMovies();

    changeUsersList(users);
  });

  const loadMovies = async() => {
    const response = await fetch(`https://venbest-test.herokuapp.com/`);

    return response.json();
  };

  const filteredByName = usersList.filter(user => (
    user.name.toLowerCase().includes(
      nameQuery.toLowerCase(),
    )
  ));

  const filteredByLastname = usersList.filter(user => (
    user.lastname.toLowerCase().includes(
      lastnameQuery.toLowerCase(),
    )
  ));

  const filteredByAge = usersList.filter(user => (
    user.age.toString().toLowerCase().includes(
      ageQuery.toLowerCase(),
    )
  ));

  // const filteredBySex = usersList.filter(user => (
  //   user.sex.includes(
  //     ageQuery.toLowerCase(),
  //   )
  // ));

  const showedUsers = nameQuery ? filteredByName
    : lastnameQuery ? filteredByLastname
      : ageQuery ? filteredByAge
        // : !isChosenSex ? filteredBySex
        : usersList;

  const resetFilter = () => {
    setNameQuery('');
    setLastnameQuery('');
    setAgeQuery('');
    // setChosenSex(false);
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
              <input type="checkbox" value="m" />
              <p>Мужской</p>
            </label>
            <label>
              <input type="checkbox" value="f" />
              <p>Женский</p>
            </label>
          </div>
        </div>

        <div className="header__button">
          {
            nameQuery
            && <button type="button" onClick={resetFilter}>Reset filter</button>
          || lastnameQuery
          && <button type="button" onClick={resetFilter}>Reset filter</button>
          || ageQuery
          && <button type="button" onClick={resetFilter}>Reset filter</button>
          }
        </div>
      </div>

      <UsersList users={showedUsers} />
    </div>
  );
};
