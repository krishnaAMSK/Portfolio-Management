/* eslint-disable import/no-anonymous-default-export */
export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.Token;

  if (!jwt) {
    return res.json({ success:false, message: "Invalid token!" });
  }

  // console.log("TEst");
  // console.log(cookies)
  return res.json({ user: cookies.User, success: true, data: "Top secret data" });
}
