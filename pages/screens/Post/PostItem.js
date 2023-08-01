import { Box, Typography, styled } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Link from "next/link";
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const encodedPost = JSON.stringify(post);
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  const handleDelete = () => {
    deletePost(post._id);
  };

  const handleUpdate = () => {
    router.push({
      pathname: '/screens/Post/Update',
      query: { data: encodedPost },
    });
  };

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

            <IconButton color="primary" onClick={handleUpdate}>
              <Edit />
            </IconButton>

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

export default PostItem;
