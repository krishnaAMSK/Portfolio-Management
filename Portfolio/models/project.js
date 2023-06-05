const { ObjectId } = require('mongodb');

class Project {
  constructor(title, description, userId) {
    this._id = new ObjectId();
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}

module.exports = Project;
