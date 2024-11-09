
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

const PostDetailsPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const fetchPostDetails = async (postId: string) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!res.ok) throw new Error('Failed to fetch post details');
      const data = await res.json();
      setPost(data);
    } catch (error) {
      toast.error('Error fetching post details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Unwrap the promise using React.use() to handle the asynchronous params
    if (params?.postID) {
      fetchPostDetails(params.postID);
    } else {
      console.error('Post ID is missing in the query');
      setLoading(false);
    }
  }, [params?.postID]);

  if (loading) {
    return <div>Loading post details...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
          <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-xl">
            <h1 className="text-3xl font-semibold text-white mb-6">{post.title}</h1>
           <p className="text-white">{post.body}</p>
          </div>
         </div>
  );
};

export default PostDetailsPage;


