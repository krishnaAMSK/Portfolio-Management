import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// const secret = process.env.SECRET;

export default async function (req, res) {
  const { user } = req.body;
  const { cookies } = req;
  const jwt = cookies.Token;

  if (!jwt) {
    return res.json({ message: "Bro you are already not logged in..." });
  } else {
    const TOKEN = serialize("Token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  
    const USER = serialize("User", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", [TOKEN, USER]);
    res.status(200).json({ success:true, message: "Updated Successfully" });
  }
}
