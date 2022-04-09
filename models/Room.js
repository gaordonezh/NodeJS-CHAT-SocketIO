const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const RoomSchema = new Schema(
  {
    name: {
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

RoomSchema.plugin(uniqueValidator);

module.exports = model("room", RoomSchema);
