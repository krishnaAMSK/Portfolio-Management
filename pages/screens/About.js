import Header from "../components/Header";
import Footer from "../components/Footer";
import Intro from "../components/About";
import Contact from "../components/Contact"
import Project from "../components/Project"
import Content from "../components/About-content"

function About() {
  
  return (
    <div>
      <Header></Header>
      <Intro></Intro>
      <Content></Content>
      <Project></Project>
      
      <Contact></Contact>
    </div>
    
  );
}

export default About;
