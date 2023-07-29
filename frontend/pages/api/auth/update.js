// pages/api/update-user.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name } = req.body;

    try {
      const response = await axios.post('http://localhost:3000/api/update-user', { email, name });

      if (response.data.success) {
        res.status(200).json({ success: true, message: 'User updated successfully' });
      } else {
        res.status(500).json({ success: false, message: 'Error updating user' });
      }
    } catch (error) {
      console.error('API request error:', error);
      res.status(500).json({ success: false, message: 'Error updating user' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Not found' });
  }
}
