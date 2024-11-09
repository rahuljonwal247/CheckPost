
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase.';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Link from 'next/link'; // for navigation to post details page

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPosts, setTotalPosts] = useState(0); // Total number of posts
  const postsPerPage = 10; // Number of posts to display per page
  const router = useRouter();

  useEffect(() => {
    // Authentication state change listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after checking auth
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch posts if authenticated
    if (!loading && !user) {
      toast.error('Please log in to view posts');
      router.push('/login');
    } else if (user) {
      const fetchPosts = async () => {
        try {
          // Fetch posts for current page
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
          );
          const data = await res.json();
          setPosts(data);

          // Fetch total post count for pagination
          const totalRes = await fetch('https://jsonplaceholder.typicode.com/posts');
          const totalData = await totalRes.json();
          setTotalPosts(totalData.length);
        } catch (error) {
          toast.error('Error fetching posts');
        }
      };
      fetchPosts();
    }
  }, [user, loading, currentPage, router]);

  // Pagination logic
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/posts?page=${newPage}`); // Update URL with the new page number
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-white mb-6">Posts</h1>
        {posts.length ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                <h2 className="text-xl text-white">
                  <Link href={`/posts/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No posts available</p>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
