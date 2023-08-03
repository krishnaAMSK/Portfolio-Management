import { NextResponse } from "next/server";

export default function middleware(req) {
  const verify = req.cookies.get("loggedin");

//   // If the "loggedin" cookie is not present and not already on the login page, redirect to the login page.
//   if (!verify && req.nextUrl.pathname !== "/") {
//     return NextResponse.redirect(`${req.nextUrl.origin}/`);
//   }

//   // If the user is logged in, redirect to the "Home" screen.
//   if (verify && req.nextUrl.pathname === "/") {
//     return NextResponse.redirect(`${req.nextUrl.origin}/screens/Home`);
//   }
}
