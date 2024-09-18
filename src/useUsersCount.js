// useFetchCounter.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUsersCount(counterType) {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await axios.get(`https://test1-52d71-default-rtdb.firebaseio.com/counters/usersCounter.json`);
        setCounter(response.data || 0);
      } catch (err) {
        setError('Error fetching counter');
        console.error('Error fetching counter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, [counterType]);

  return { counter, loading, error };
}
