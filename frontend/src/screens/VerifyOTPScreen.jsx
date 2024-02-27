import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../actions/userActions';

const VerifyOTPScreen = ({ history }) => {
  const [otp, setOTP] = useState('');
  const dispatch = useDispatch();

  const otpVerify = useSelector((state) => state.verifyOTP);
  const { loading, error, success } = otpVerify;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(verifyOTP({ otp }));
  };

  // Redirect to "/" when success is true
  React.useEffect(() => {
    if (success) {
      window.location.href = '/'; // Redirect to "/"
    }
  }, [success]);

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          ></input>
        </div>
        <button type="submit">Verify OTP</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>OTP Verified Successfully!</p>}
    </div>
  );
};

export default VerifyOTPScreen;
