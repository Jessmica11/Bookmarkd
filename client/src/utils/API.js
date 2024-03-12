// get logged-in user's info
export const getMe = (token) => {
  return fetch('/api/users', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching user data:', error.message);
      throw new Error('Failed to fetch user data');
    });
};

// get logged-in user's bio
export const getUserBio = (token) => {
  return fetch('/api/users/bio', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching user bio:', error.message);
      throw new Error('Failed to fetch user bio');
    });
};

// get logged-in user's comments
export const getUserComments = (token) => {
  return fetch('/api/users/comments', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching user comments:', error.message);
      throw new Error('Failed to fetch user comments');
    });
};

// create a new user's account
export const createUser = (userData) => {
  return fetch('/api/users/register', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .catch(error => {
    console.error('Error creating user:', error.message);
    throw new Error('Failed to create user');
  });
};

// log the user in
export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error logging in:', error.message);
      throw new Error('Failed to log in');
    });
};

// delete the user's account and associated comments
export const deleteUser = (token) => {
  return fetch('/api/users/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error deleting user:', error.message);
      throw new Error('Failed to delete user');
    });
};
