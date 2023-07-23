import Image from "next/image";
import Link from "next/link";
const Contact = () => {
    return(
        <div id="section-3" class="About_me">
        <div class="content">
            <div class="my_name">
                Reach me
            </div>
            <p>       
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut consequat semper viverra nam libero justo laoreet sit amet. Egestas dui id ornare arcu odio ut sem nulla. Cras ornare arcu dui vivamus arcu felis bibendum. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Nunc eget lorem dolor sed viverra ipsum nunc. Convallis tellus id interdum velit laoreet id donec. Morbi quis commodo odio aenean sed adipiscing diam donec. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Cursus eget nunc scelerisque viverra mauris in.
            </p>
            <Link href="https://github.com/">
                <Image class="image" src="/images/github.png" alt="My Image" width={140} height={90} />
            </Link>
            <Link href="https://linkedin.com/">
                <Image class="image" src="/images/linkedin.png" alt="My Image" width={140} height={90} />
            </Link>
            <Link href="mailto: yourmail@hotmail.com">
                <Image class="image" src="/images/gmail.png" alt="My Image" width={140} height={90} />
            </Link>
            <Link href="https://instagram.com/">
                <Image class="image" src="/images/instagram.png" alt="My Image" width={140} height={90} />
            </Link>
           
        </div>
    </div>
    );
}

export default Contact;
   
