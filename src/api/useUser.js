'use client';

import { useState, useEffect } from 'react';
import { getUser } from './user';

function decodeToken(token) {
  try {
    function fromBase64(str) {
      if (typeof atob !== 'undefined') {
        return atob(str);
      } else if (typeof Buffer !== 'undefined') {
        return Buffer.from(str, 'base64').toString('utf-8');
      } else {
        throw new Error('No base64 decoding available');
      }
    }
    const decoded = fromBase64(token);
    const [id, email] = decoded.split(':');
    if (id && email) return { id, email };
    return null;
  } catch {
    return null;
  }
}

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
          setError('No user token found');
          setUser(null);
          setLoading(false);
          return;
        }
        const decoded = decodeToken(token);
        if (!decoded) {
          setError('Invalid user token');
          setUser(null);
          setLoading(false);
          return;
        }
        const u = await getUser({ id: decoded.id, email: decoded.email });
        if (!ignore) setUser(u);
      } catch (err) {
        if (!ignore) setError(err.message || 'Failed to fetch user');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchUser();
    return () => {
      ignore = true;
    };
  }, []);

  return { user, loading, error };
}
