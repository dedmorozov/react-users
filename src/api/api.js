const API_URL = 'https://venbest-test.herokuapp.com/';

export const loadUsers = async() => {
  const response = await fetch(API_URL);

  return response.json();
};
