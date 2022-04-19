const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Field is required"],
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Field is required"],
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: [true, "Field is required"],
    },
    content: {
      type: String,
      required: [true, "Field is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("message", MessageSchema);
