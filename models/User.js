const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    f_name: {
      type: String,
      required: [true, "field is required"],
    },
    l_name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "field is required"],
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: [true, "field is required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    reset_password_token: {
      type: String,
    },
    reset_password_expires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log("error en bcyprt".error);
  }
};

UserSchema.statics.comparePassword = async (password, recievedPassword) => {
  return await bcrypt.compare(password, recievedPassword);
};

UserSchema.methods.toJSON = function () {
  let user = this;
  let useObject = user.toObject();
  delete useObject.password;

  return useObject;
};

UserSchema.plugin(uniqueValidator);

module.exports = model("user", UserSchema);
