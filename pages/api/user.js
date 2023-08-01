export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.Token;

  if (!jwt) {
    return res.json({ success:false, message: "Invalid token!" });
  }

  return res.json({ user: cookies.User, success: true, data: "Top secret data" });
}
