
'use client';

import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase.';  // Adjust import path as necessary
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar'; // Adjust path as necessary
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);  // State to store the user
  const router = useRouter();  // Router instance to handle path changes

  useEffect(() => {
    // Authentication listener to monitor changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Update user state with the current user
    });

    // Cleanup listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Check if the current path is the login page
  const isLoginPage = router.pathname === '/login';

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* Show Logo on all pages except Login */}
        {!isLoginPage && (
          <div className="absolute top-7 left-6 opacity-100 ml-10">
          <Image
            src="/Group2.svg" // Replace with your logo image path
            alt="Logo"
            width={60}
            height={55.25}
            className="object-contain"
          />
        </div>
        )}

        {/* Show Navbar if the user is logged in and not on the login page */}
        {!isLoginPage && user && <Navbar />}
        
        {/* Main content goes here */}
        <main>{children}</main>
      </body>
    </html>
  );
}
