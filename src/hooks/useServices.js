import { useEffect, useState } from 'react';
import {
  listenToActiveServices,
  listenToAllServices,
} from '../services/servicesService';
import toast from 'react-hot-toast';

export const useServices = ({ activeOnly = false } = {}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const handleSnapshot = (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(data);
      setLoading(false);
    };

    const handleError = (err) => {
      setError(err);
      setLoading(false);
      toast.error('Unable to fetch services right now.');
    };

    const unsubscribe = activeOnly
      ? listenToActiveServices(handleSnapshot, handleError)
      : listenToAllServices(handleSnapshot, handleError);

    return () => unsubscribe?.();
  }, [activeOnly]);

  return { services, loading, error };
};
