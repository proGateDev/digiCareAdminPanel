import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      axios.get(`http://192.168.0.172:8000/member/auth/verify-email?token=${token}`)
        .then(response => {
          setMessage(response.data.message);
          setTimeout(() => {
            router.push('/member/login');
          }, 3000);
        })
        .catch(error => {
          setMessage(error.response?.data.message || 'Verification failed. Please try again.');
        });
    } else {
      setMessage('No verification token provided.');
    }
  }, [token]);

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    color: '#333',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#0070f3',
  };

  const messageStyle = {
    fontSize: '1.2rem',
    marginTop: '0.5rem',
    padding: '0 1rem',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const handleResendEmail = () => {
    // Navigate to the "Resend Verification Email" screen
    router.push('/resend-verification-email');
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Email Verification</h1>
      <p style={messageStyle}>{message}</p>
      {message !== 'Your email has been verified! You can now log in.' && (
        <button style={buttonStyle} onClick={handleResendEmail}>
          Resend Verification Email
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
