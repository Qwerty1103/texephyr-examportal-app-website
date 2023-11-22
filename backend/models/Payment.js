const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    userid:                        // We'll use TexID as id
    {
      type: String,
      required: true
    },

    events:
    {
        type: [mongoose.Schema.Types.String],
        ref: "user",
        required: true
    },

    amount:
    {
        type: String,
        required: true
    },

    paymentID:
    {
        type: String,
        required: true
    },

    paymentRequestID: {
      type: String,
      required: true
    }

},
  {
    timestamps: true,
  }
)

const Payment = mongoose.model('payment', PaymentSchema);
Payment.createIndexes();
module.exports = Payment;