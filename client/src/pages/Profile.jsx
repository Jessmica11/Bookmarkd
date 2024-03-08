import React from 'react';

const Profile = () => {
    const user = {
        name: 'Kurstie',
        profilePhotoUrl: 'profile-photo.jpg',
        aboutMe: {
            favoriteBook: 'Book Title',
            favoriteCoffee: 'Coffee Type',
            favoriteAuthor: 'Author Name',
            favoriteGenre: 'Genre',
            favoriteQuote: 'Quote',
            favoritePlaceToRead: 'Place to Read',
        },
        readingRewards: {
            January: true,
            February: true,
            March: true,
            April: true,
            May: false,
            June: false,
            July: false,
            August: false,
            September: false,
            October: false,
            November: false,
            December: false,
        }
    };

    // Function to render ribbon for each month
    const renderRibbon = (month, participated) => {
        const ribbonImageUrl = participated ? 'color-ribbon.jpg' : 'gray-ribbon.jpg';
        return <img src={ribbonImageUrl} alt={`${month} Ribbon`} />;
    };

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <img src={user.profilePhotoUrl} alt="Profile" style={{ float: 'left', marginRight: '20px' }} />
                <div>
                    <h2>About Me</h2>
                    <p>Favorite Book: {user.aboutMe.favoriteBook}</p>
                    <p>Favorite Coffee: {user.aboutMe.favoriteCoffee}</p>
                    <p>Favorite Author: {user.aboutMe.favoriteAuthor}</p>
                    <p>Favorite Genre: {user.aboutMe.favoriteGenre}</p>
                    <p>Favorite Quote: {user.aboutMe.favoriteQuote}</p>
                    <p>Favorite Place to Read: {user.aboutMe.favoritePlaceToRead}</p>
                </div>
            </div>
            <div>
                <h2>Reading Rewards</h2>
                <div>
                    {Object.entries(user.readingRewards).map(([month, participated]) => (
                        <div key={month} style={{ display: 'inline-block', marginRight: '10px' }}>
                            {renderRibbon(month, participated)}
                            <p>{month}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
