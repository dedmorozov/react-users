/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

const maleAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Male_Avatar.jpg/1200px-Male_Avatar.jpg';
const femaleAvatar = 'https://www.islandhospital.com/hubfs/female-1.jpg';

export const User = ({
  name,
  lastname,
  age,
  sex,
}) => (
  <div className="users__card card">
    <div className="card__img">
      <img src={sex === 'm' ? maleAvatar : femaleAvatar} alt="avatar" />
    </div>
    <div className="card__name">
      <strong>
        {name}
        {' '}
        {lastname}
      </strong>
    </div>

    <div className="card__sex">
      Пол:
      {' '}
      {sex === 'm' ? 'Мужской' : 'Женский'}
    </div>
    <div className="card__age">
      Возраст:
      {' '}
      {age}
    </div>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  sex: PropTypes.string.isRequired,
};
