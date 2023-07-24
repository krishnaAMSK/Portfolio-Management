import { useState, useEffect, useContext } from 'react';
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Box, Typography, styled } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import Header from '@/pages/components/Header';



// components
// import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    border: '1px solid #e2e8f0', 
    borderRadius: '10px', 
    padding: '20px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const PostItem = ({ post, user, deletePost }) => {
    const url =
      'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  
    const handleDelete = () => {
      deletePost(post._id);
    };
//     const handleUpdate = () => {
//     router.push({
//       pathname: '/Update',
//       query: { data: JSON.stringify(post) }, // Serialize the post object to a string
//     });
//   };
  const encodedPost=JSON.stringify(post)
    return (
        <Container>
          <Image src={post.picture || url} alt="post" />
          <Box style={{ float: 'right' }}>
            {user?.email === post.email && (
              <>
                {/* <Link href={`./Update?data=${encodedPost}`} passHref>
                  <EditIcon color="primary" />
                </Link>
                <DeleteIcon onClick={handleDelete} color="error" /> */}
                <Link href={`./Update?data=${encodedPost}`} passHref>
                    <IconButton color="primary">
                        <Edit />
                    </IconButton>
                </Link>
                <IconButton onClick={handleDelete} color="error">
                    <Delete />
                </IconButton>
              </>
            )}
          </Box>
          <Heading>{post.title}</Heading>
    
          <Author>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              href={`/?email=${post.email}`}
              passHref
            >
              <Typography>
                Author: <span style={{ fontWeight: 600 }}>{post.email}</span>
              </Typography>

            </Link>
            <Typography style={{ marginLeft: 'auto' }}>
              {new Date(post.createdDate).toDateString()}
            </Typography>
          </Author>
    
          <Typography>{post.description}</Typography>
          {/* <Comments post={post} /> */}
        </Container>
      );
    };

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
    console.log('from display');
    console.log(email);

    useEffect(() => {
        const fetchData = async () => {
            console.log('checking link - new')
            // console.log(`http://localhost:5000/post/view/${email}`)
            // let response = await axios.get(`http://localhost:5000/post/view/${email}`);
            let response = await axios.get('http://localhost:5000/post/view');
            console.log('Fetched Data')
            if (response.data.success) {
                setPost(response.data.post);
                console.log('Seeing Display Fetch Response');
                console.log(response.data.post)
                console.log('......')
                console.log(post)
                console.log('......')
            }
        }
        fetchData();
    }, [user]);

    const deleteBlog = async (postId) => {
        let response = await axios.delete(`http://localhost:5000/post/delete/${postId}`);
        router.push('/');
    }

    return (
        <div>
         <Header/>
          {post?.map((post) => (
            <PostItem key={post._id} post={post} user={user} deletePost={deleteBlog} />
          ))}
        </div>
      );
}

export default DetailView;