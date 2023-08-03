import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AddCircle as Add } from '@mui/icons-material';
import Header from '../../components/Header';




const Container = ({ children }) => (
  <div className="container mx-auto px-4">{children}</div>
);

const Image = ({ src }) => (
  <img
    className="w-full h-60 object-cover rounded-md"
    src={src}
    alt="post"
  />
);

const StyledFormControl = ({ children }) => (
  <div className="flex items-center mt-4">{children}</div>
);

const InputTextField = ({ onChange, placeholder }) => (
  <input
    className="flex-1 mr-2 px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
    type="text"
    placeholder={placeholder}
    onChange={onChange}
  />
);

const Textarea = ({ onChange, placeholder }) => (
  <textarea
    className="w-full px-4 py-2 mt-4 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
    rows="5"
    placeholder={placeholder}
    onChange={onChange}
  />
);

const Button = ({ onClick, children }) => (
  <button
    className="px-6 py-3 mt-4 text-lg font-medium text-black bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
    onClick={onClick}
  >
    {children}
  </button>
);

const initialPost = {
  title: '',
  description: '',
  picture: '',
  email: '',
  categories: '',
  createdDate: new Date(),
};

const CreatePost = () => {
  const router = useRouter();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get('../../api/user');
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };
    checkUserAuthentication();
  }, []);

  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  useEffect(() => {
      const getImage = async () => { 
          if(file) {
              const data = new FormData();
              data.append("name", file.name);
              data.append("file", file);
              
              const response = await axios.post("http://localhost:5000/file/upload",data);
              const updatedPost = { ...post, picture: response.data };
              setPost(updatedPost);
            //   post.picture = response.data;
          }
      }
      getImage();
    //   post.categories = router.query.category || 'All';
    //   post.email = user?.email;
    const { category } = router.query;
    const updatedPost = {
        ...post,
        categories: category || 'All',
        email: user?.email || '',
    };
    setPost(updatedPost);
  }, [file,router.query.category,user])


  const savePost = async () => {
      const response = await axios.post("http://localhost:5000/post/create",post);
      // await API.createPost(post);
      console.log(post);
      router.reload();
  }

  const handleChange = (e) => {
    if(e.target.id=="title")
    {
        const updatedPost = { ...post, title: e.target.value};
        setPost(updatedPost);
    }
    else if(e.target.id=="description")
    {
        const updatedPost = { ...post, description: e.target.value};
        setPost(updatedPost);
    }
  }

  return (
    <Container>
        <Header/>
        <div className="relative mt-8">
        <label
          htmlFor="fileInput"
          className="absolute top-0 right-0 cursor-pointer rounded-full p-2 bg-white shadow"
        >
          <Add className="w-8 h-8 text-black" />
          <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        </label>
        <Image src={post.picture || 'https://source.unsplash.com/random'} alt="post" />
        <form onSubmit={savePost} className="bg-white w-1/2 mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Enter your Title"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Enter your description"
                  onChange={handleChange}
                />
              </div>
              <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Publish
                </button>
            </form>
        </div>    
    </Container>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true
    },
  }
}

export default CreatePost;
