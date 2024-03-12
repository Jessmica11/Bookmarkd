import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../utils/queries';
import profileBlank from '../assets/images/profile-blank.png';
import awardicon from '../assets/images/awardicon6.png';
import awardiconbw from '../assets/images/awardiconbw.png';
import '../assets/css/style.css';
import asgoodasdead from '../assets/images/asgoodas.jpeg';
import twisted from '../assets/images/twistedlies.jpeg';
import love from '../assets/images/love.jpeg';
import { ProgressBar } from 'react-bootstrap';
import bio from '../components/SignUp/SignUp.jsx';

const Profile = () => {
    const { loading, error, data } = useQuery(QUERY_CURRENT_USER);
    const [currentUser, setCurrentUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(profileBlank); // Default profile photo

    useEffect(() => {
        if (data) {
            setCurrentUser(data.currentUser);
        }
    }, [data]);

    // Function to handle profile photo upload
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0]; // Get the first file selected by the user
        const reader = new FileReader(); // Create a new FileReader object
        reader.onloadend = () => {
            // Set the profile photo to the uploaded file or default profile photo if no file is uploaded
            setProfilePhoto(reader.result || profileBlank);
        };
        if (file) {
            reader.readAsDataURL(file); // Convert the file to a data URL
        }
    };

    // Check loading state
    if (loading) return <p>Loading...</p>;

    // Check error state
    if (error) {
        console.error('Error fetching user data:', error);
        return <p>Error fetching user data!</p>;
    }

    return (
        <div className="profile-page" style={{ color: 'white' }}>
            <div className="left-column">
                <div className="profile-info">
                    <div className="profile-photo">
                        <img src={profilePhoto} style={{ width: '200px', height: '200px', borderRadius: '50%' }} alt="Profile" />
                        <input type="file" onChange={handlePhotoUpload} accept="image/*" style={{ marginTop: '10px' }} />
                    </div>
                    <div className="profile-details">
                        <h2>{currentUser ? currentUser.name : ''}</h2>
                        <p>{currentUser ? currentUser.quote : ''}</p>
                    </div>
                </div>
                <div className="quick-glance">
                    <div className="quick-info">
                        <p>Location: {currentUser ? currentUser.location : ''}</p>
                        <p>Favorite Genres: {currentUser ? currentUser.favoriteGenres.join(', ') : ''}</p>
                    </div>
                </div>
            </div>
            <div className="middle-column">
                <div className="bio-section">
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </div>
                <div className="book-recommendations">
                    <h3>Book Recommendations</h3>
                    <div style={{ textAlign: 'center' }}>
                        <img src={asgoodasdead} style={{ width: '100px', height: '150px', margin: '20px' }} alt="BookRec" />
                        <img src={twisted} style={{ width: '100px', height: '150px', margin: '20px' }} alt="BookRec" />
                        <img src={love} style={{ width: '100px', height: '150px', margin: '20px' }} alt="BookRec" />
                    </div>
                </div>
                <div className="reading-goals">
                    <h3>Reading Goals</h3>
                    <div className="progressBars">
                        <p>Number of Books Read to Goal</p>
                        <ProgressBar now={60} label="60%" variant="success" style={{ height: '30px' }} />
                        <p>Different Genres Read to Goal</p>
                        <ProgressBar now={30} label="30%" variant="info" style={{ height: '30px' }} />
                        <p>Number of Authors Read to Goal</p>
                        <ProgressBar now={80} label="80%" variant="warning" style={{ height: '30px' }} />
                    </div>
                </div>
            </div>
            <div className="right-column">
                <div className="reading-rewards">
                    <h3>Reading Rewards</h3>
                    <div className="reward-grid">
                        {Object.entries(readingRewards).map(([month, participated]) => (
                            <div key={month} className="reward-item">
                                {renderRibbon(month, participated)}
                                <p>{month}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display favorite authors */}
                <div className="favorite-authors" style={{ textAlign: 'center' }}>
                    <h3>Favorite Authors</h3>
                    <div className="add-favorite-author" style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            placeholder="Enter your favorite author"
                            style={{ marginRight: '5px', padding: '5px 10px', fontSize: '14px' }}
                        />
                        <button onClick={addFavoriteAuthor} style={{ padding: '5px 10px', fontSize: '14px' }}>Add</button>
                    </div>
                    <ul>
                        {favoriteAuthors.map((author, index) => (
                            <li key={index}>
                                {author}
                                <button onClick={() => removeFavoriteAuthor(index)} style={{ marginLeft: '10px', padding: '3px 6px', fontSize: '12px' }}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
