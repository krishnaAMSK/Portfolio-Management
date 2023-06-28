import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Layout() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/Signin");
  };
  return (
    <div class="shadow-md font-mono bg-blue-300 w-full h-24">
      <div class="p-4">
        <Link href="/">
          <Image src="/port.png" alt="My Image" width={140} height={90} />
        </Link>
      </div>
      <div class=" font-mono text-xl text-black p-8 flex flex-row space-x-4 top-right-div absolute top-0 right-0">
        <button
          onClick={handleClick}
          className="bg-black hover:bg-slate-700 text-white py-1 px-4 rounded"
        >
          Sign In
        </button>
        <Link href="/About">About</Link>
        <Link href="/Contact">Contact</Link>
        <Link href="/Profile">Profile</Link>
      </div>
    </div>
  );
}
export default Layout;
