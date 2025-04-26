'use client';

import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

const useAutoLogout = (autoLogoutTime = 15 * 60 * 1000) => {

  const handleSignOut = async () => {
    try {
        await signOut(auth);
        window.location.href = '/admin/login';
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  useEffect(() => {

    const checkSession = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      const currentTime = Date.now();

      if (lastActivity && currentTime - Number(lastActivity) > autoLogoutTime) {
        handleSignOut();
        localStorage.removeItem('lastActivity');
      }
    };

    const updateLastActivity = () => {
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    // Check session on page load
    checkSession();

    window.addEventListener('click', updateLastActivity);
    window.addEventListener('keydown', updateLastActivity);

    return () => {
      window.removeEventListener('click', updateLastActivity);
      window.removeEventListener('keydown', updateLastActivity);
    };
  }, [autoLogoutTime]);

};

export default useAutoLogout;
