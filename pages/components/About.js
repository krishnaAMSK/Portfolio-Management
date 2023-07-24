import { dividerClasses } from "@mui/material";
import { Button } from 'react-bootstrap';

const handleButtonClick = () => {
    window.open('http://google.com', '_blank');
};

const About = () => {
    return(
    <div style={styles.container}>
    <div style={styles.content}>
      <h1 style={styles.heading}>Hi, My name is Vaishnavi and I am a Engineering student.</h1>
      <img
        src="https://picsum.photos/id/64/200/300" // Replace 'john_photo_url' with the actual URL of John's photo
        alt="John Doe"
        style={styles.photo}
      />
      {/* <Button variant="primary">Check my resume</Button>  */}
      <button onClick={handleButtonClick} style={{margin: '40px'}} className="bg-transparent text-white hover:bg-white hover:text-black font-bold py-2 px-4 border border-white-700 active:bg-white">
      Check my resume
      </button>
    </div>
    <div>
        
    </div>
  </div>
    );
    
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  photo: {
    width: '250px',
    height: '275px',
    borderRadius: '20%',
    //boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Optional: add a shadow to the photo
    margin: 'auto',
    // width: '50%',
  },
};
  
export default About;