const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }, 
    source: {
      type: String,
      required: true,
    }  
  }
);

const ownerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    projects: [projectSchema] 
  }
);

module.exports = mongoose.model("projects", ownerSchema);