import React, { useState } from 'react';
import kurstieprofilepic from '../assets/images/kurstieprofilepic.png';
import awardicon from '../assets/images/awardicon6.png';
import awardiconbw from '../assets/images/awardiconbw.png';
import '../assets/css/style.css';
import asgoodasdead from '../assets/images/asgoodas.jpeg';
import twisted from '../assets/images/twistedlies.jpeg';
import love from '../assets/images/love.jpeg';
import { ProgressBar } from 'react-bootstrap';
import bio from '../components/SignUp/SignUp.jsx';

const Profile = () => {
    // Define user information
    const user = {
        name: 'Kurstie DeHaven-Vargas',
        quote: 'A book is a dream that you hold in your hand. - Neil Gaiman',
        location: 'North Carolina, USA',
        favoriteGenres: ['Psychological Thriller', 'Mystery', 'Smut'],
    };

    // Define reading rewards data
    const readingRewards = {
        January: true,
        February: true,
        March: true,
        April: true,
        May: false,
        June: false,
        July: false,
        August: true,
        September: false,
        October: false,
        November: false,
        December: false,
    };

    const [favoriteAuthors, setFavoriteAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');

    const addFavoriteAuthor = () => {
        if (newAuthor.trim() !== '') {
            setFavoriteAuthors([...favoriteAuthors, newAuthor]);
            setNewAuthor('');
        }
    };

    const removeFavoriteAuthor = (index) => {
        const updatedAuthors = [...favoriteAuthors];
        updatedAuthors.splice(index, 1);
        setFavoriteAuthors(updatedAuthors);
    };

    // Function to render ribbon for each month
    const renderRibbon = (month, participated) => {
        const ribbonImageUrl = participated ? awardicon : awardiconbw;
        return <img src={ribbonImageUrl} alt={`${month} Ribbon`} style={{ width: '50px', height: '50px' }} />;
    };

    // Progress bar components
    const ReadingGoalProgressBar = ({ variant, completed, height }) => {
        return <ProgressBar now={completed} label={`${completed}%`} variant={variant} style={{ height: height }} />;
    };

    return (
        <div className="profile-page" style={{ color: 'white' }}>
            <div className="left-column">
                <div className="profile-info">
                    <div className="profile-photo">
                        <img src={kurstieprofilepic} style={{ width: '200px', height: '200px', borderRadius: '50%' }} alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <h2>{user.name}</h2>
                        <p>{user.quote}</p>
                    </div>
                </div>
                <div className="quick-glance">
                    <div className="quick-info">
                        <p>Location: {user.location}</p>
                        <p>Favorite Genres: {user.favoriteGenres.join(', ')}</p>
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
                        <ReadingGoalProgressBar variant="success" completed={60} height={30} />
                        <p>Different Genres Read to Goal</p>
                        <ReadingGoalProgressBar variant="info" completed={30} height={30} />
                        <p>Number of Authors Read to Goal</p>
                        <ReadingGoalProgressBar variant="warning" completed={80} height={30} />
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

