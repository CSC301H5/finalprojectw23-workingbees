import React, { useState } from 'react';
import DisplayMultiselect from './DisplayMultiselect';

const Profile = ({ users }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const currentUser = users[currentIndex];

  return (
    <div>
      <h2>{currentUser.name}'s Profile</h2>
      <DisplayMultiselect options={currentUser.languages} question="What languages do you speak?" />
      <DisplayMultiselect options={currentUser.hobbies} question="What are your hobbies?" />
      <DisplayMultiselect options={currentUser.skills} question="What are your skills?" />
      <button onClick={handlePrevious} disabled={currentIndex === 0}>Backwards</button>
      <button onClick={handleNext} disabled={currentIndex === users.length - 1}>Forward</button>
    </div>
  );
};

export default Profile;
