import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../actions/userActions';

const ChangePasswordScreen = () => {
  const { uidb64, token } = useParams();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      dispatch(resetPassword(password1))
        .then(() => {
          // Password reset successful
          history.push('/login'); // Redirect to login page
        })
        .catch((error) => {
          // Handle error, show error message to the user
          console.error('Error resetting password:', error);
        });
    } else {
      // Passwords don't match, show error message to the user
      console.error('Passwords do not match');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password1">New Password:</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm New Password:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordScreen;
