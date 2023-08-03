import { useState, useEffect, useContext } from 'react';
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Box, Typography, styled } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import Header from '@/pages/components/Header';
import PostItem from '@/pages/screens/Post/PostItem';

// components
// import Comments from './comments/Comments';

const DetailView = () => {
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get('../../api/user');
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };
    checkUserAuthentication();
  }, []);

  const { email } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('http://localhost:5000/post/view');
      if (response.data.success) {
        setPost(response.data.post);
      }
    }
    fetchData();
  }, [user]);

  const deleteBlog = async (postId) => {
    let response = await axios.delete(`http://localhost:5000/post/delete/${postId}`);
    router.reload();
  }

  return (
    <div>
      <Header />
      {post?.map((post) => (
        <PostItem key={post._id} post={post} user={user} deletePost={deleteBlog} />
      ))}
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true
    },
  }
}

export default DetailView;