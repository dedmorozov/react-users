import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './UsersList.scss';

export const UsersList = ({ users }) => (
  <div className="users">
    {users.map(user => (
      <User
        key={user.name}
        name={user.name}
        lastname={user.lastname}
        age={user.age}
        sex={user.sex}
      />
    ))}
  </div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
  })).isRequired,
};
