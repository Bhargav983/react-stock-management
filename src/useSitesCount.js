// useSitesCount.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSitesCount() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSitesCounter = async () => {
      try {
        const response = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/counters/sitesCounter.json');
        setCounter(response.data || 0); // Default to 0 if no counter found
      } catch (err) {
        setError('Error fetching sites counter');
        console.error('Error fetching sites counter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSitesCounter();
  }, []);

  return { counter, loading, error };
}
