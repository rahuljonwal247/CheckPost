// // components/Navbar.tsx
// "use client"; // Add this line to mark it as a Client Component
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // Updated import
// import { signOut } from 'firebase/auth';
// import { auth } from '../lib/firebase.';

//  // Adjust the path accordingly


// const Navbar = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push('/login'); // Redirect after logout
//   };

//   return (
//     <nav>
      
//     </nav>
//   );
// };

// export default Navbar;
// components/Navbar.tsx
// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { signOut } from 'firebase/auth';
// import { auth } from '../lib/firebase.';

// const Navbar = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/login'); // Redirect to login page after logout
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <div className="text-white text-2xl">
//           <Link href="/">MyApp</Link>
//         </div>
//         <div className="space-x-4">
//           <Link href="/posts" className="text-white hover:text-blue-400">Posts</Link>
//           <button 
//             onClick={handleLogout} 
//             className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase.';

const Navbar = () => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">
          <Link href="/"></Link>
        </div>
        <div className="space-x-4">
          {/* Only show "Posts" link if the current path is not "/posts" */}
          {pathname !== '/posts' && (
            <Link href="/posts" className="text-white hover:text-blue-400">Posts</Link>
          )}
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


