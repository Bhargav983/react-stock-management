import { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for Firebase API calls

export default function useFetchSites() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSites = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/sites.json');
      const fetchedSites = response.data ? Object.entries(response.data).map(([id, site]) => ({ id, ...site })) : [];
      setSites(fetchedSites);
    } catch (err) {
      setError('Failed to fetch sites.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites(); // Fetch sites on component mount
  }, []);

  return { sites, loading, error, fetchSites };
}
