const mongoose = require("mongoose");
const { Schema } = mongoose;

const RegistrationSchema = new Schema({
  
  events: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: true,
      },
      groupMembers: {
        type: [mongoose.Schema.Types.String],
        required: true,
      },
    },
  ],

  userId: {
    type: String,
    ref: "user",
  },

  // Offline or Online
  reg_type: {
    type: String,
    required: true,
  },

  // Optional ID for offline PR
  reference_id: {
    type: String,
    default: null,
  },

  regDate: {
    type: Date,
    default: new Date(),
  },

  totalAmt: {
    type: Number,
    required: true,
  },
});

const TestRegistration = mongoose.model("testRegistration", RegistrationSchema);
TestRegistration.createIndexes();
module.exports = TestRegistration;
