import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const Decorator = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load user info from Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || '',
          email: currentUser.email || '',
        });
      } else {
        setError('User not logged in.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const applicationData = {
        name: user.name,
        email: user.email,
      };

      // Replace with your backend endpoint
      await axios.post('http://localhost:3000/decorator', applicationData);

      setSuccess('Application submitted successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to submit application.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error && !user.email) return <div>{error}</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Become a Decorator</h2>
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
          Name
          <input type="text" value={user.name} readOnly style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
          Email
          <input type="email" value={user.email} readOnly style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </label>
        <button type="submit" style={{ padding: '12px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Decorator;
