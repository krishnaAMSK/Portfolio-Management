const { ObjectId } = require('mongodb');
const { getDb } = require('../config/database');

class Message {
  constructor(sender, recipient, content, isRead = false) {
    this.sender = sender;
    this.recipient = recipient;
    this.content = content;
    this.isRead = isRead;
  }

  async save() {
    const db = getDb();
    await db.collection('messages').insertOne(this);
  }

  static async getInboxMessages(email) {
    const db = getDb();
    return await db
      .collection('messages')
      .find({ recipient: email })
      .toArray();
  }

  static async getOutboxMessages(email) {
    const db = getDb();
    return await db
      .collection('messages')
      .find({ sender: email })
      .toArray();
  }

  static async markAsRead(messageId) {
    const db = getDb();
    await db
      .collection('messages')
      .updateOne({ _id: new ObjectId(messageId) }, { $set: { isRead: true } });
  }
}

module.exports = Message;
