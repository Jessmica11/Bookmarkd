import { Link } from 'react-router-dom';
import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_CURRENT_USER } from '../../utils/queries';
import Auth from '../../utils/authUtils';

const Header = () => {
  // this should grab the user's username from the token that exists when they've logged in
  // const { loading, error, data } = useQuery(QUERY_CURRENT_USER);

  const logout = (event) => {
    event.preventDefault();
    // this will remove the token from local storage and log the user out
    Auth.logout();
  };

  // if the user is logged in, show their username and a logout button
  return (
    <header className="bg-primary text-light py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/home">
            <h1 className="m-0" style={{fontSize: "3em"}}>Bookmark'd</h1>
          </Link>
          <p className="m-0" style={{fontSize: "1.5em"}}>Find Your Book Club 📚</p>
        </div>
        <div>
          {/* {loading && <p>Loading...</p>}
          {error && <p>Error fetching user data: {error.message}</p>}
          {data && data.me && ( */}
            <>
              <Link className="btn btn-lg btn-info m-2" to="/auth">
                Login
              </Link>
            </>
        </div>
      </div>
    </header>
  );
};

export default Header;
