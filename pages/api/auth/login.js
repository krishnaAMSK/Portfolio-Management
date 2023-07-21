/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

// const secret = process.env.SECRET;

export default async function (req, res) {
  const { token, user } = req.body;
  const TOKEN = serialize("Token", token, {
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
  res.status(200).json({ success:true, message: "Success!" });
}
