
// import Link from 'next/link';

// export default function Home() {
//   return (
   
//   );
// }
'use client'; // Ensures this component is client-side

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirects to the login page immediately when the component mounts
    router.push('/login');
  }, [router]);

  return null; // No UI needs to be displayed as we are redirecting the user
};

export default Home;
