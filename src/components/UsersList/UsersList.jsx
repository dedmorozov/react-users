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
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
