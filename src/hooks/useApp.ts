import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthStore } from '@store/index';

export const useInitializeApp = () => {
  const [initialized, setInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const { setUser, setLoading } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        try {
          setLoading(true);
          // Check if user is already logged in
          // This will be implemented with Firebase Auth
          setInitError(null);
        } catch (error: any) {
          setInitError(error.message);
        } finally {
          setLoading(false);
          setInitialized(true);
        }
      };

      initialize();
    }, [setUser, setLoading])
  );

  return { initialized, initError };
};

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error: any) {
      setError(error.message);
      setStatus('error');
    }
  }, [asyncFunction]);

  useState(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};
