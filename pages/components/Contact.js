import Image from "next/image";
import Link from "next/link";
const Contact = () => {
    return(
        <div id="section-3" class="About_me">
        <div class="content">
            <div class="my_name">
                Reach me
            </div>
            <div>
            <div style={{float: 'left'}} class="image">
            <Link href="https://linkedin.com/">
                <Image src="/images/linkedin.png" alt="My Image" width={100} height={100}/>
            </Link>
            </div>
            <div style={{float: 'left'}} class="image">
            <Link href="https://github.com/">
                <Image src="/images/instagram.png" alt="My Image" width={100} height={100}/>
            </Link>
            </div>
            <div style={{float: 'left'}} class="image">
            <Link href="https://github.com/">
                <Image src="/images/gmail.png" alt="My Image" width={100} height={100}/>
            </Link>
         </div>
         </div>
            
{/*             
            <Link href="https://linkedin.com/">
                <Image fill={true} src="/images/linkedin.png" alt="My Image"/>
            </Link>
            <Link href="mailto: yourmail@hotmail.com">
                <Image fill={true} src="/images/gmail.png" alt="My Image"/>
            </Link>
            <Link href="https://instagram.com/">
                <Image fill={true} src="/images/instagram.png" alt="My Image" />
            </Link> */}
            
           
        </div>
        
    </div>
    );
}



export default Contact;
   
