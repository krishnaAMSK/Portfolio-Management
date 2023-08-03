export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.Token;
  const user = cookies.User;

  if (!jwt) {
    return res.json({ success:false, message: "Invalid token!" });
  }

  if(!user) res.json({ user: cookies.User, success: true, login:false, data: "Top secret data" });
  return res.json({ user: cookies.User, success: true, login:true, data: "Top secret data" });
}
