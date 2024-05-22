const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const bcrypt = require("bcrypt");

const scheama = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nane is required"],
    },
    mobile: {
      type: Number,
      required: true,
    },
    employee_id: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        default: [],
      },
    ],
    password: {
      type: String,
      required: true,
    },
  },
  { strictPopulate: false }
);

scheama.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate(); // {password: "..."}
  if (update.password) {
    this.setUpdate({
      $set: {
        password: passwordHash,
      },
    });
  }
  next();
});

// Pre-save middleware to hash the password before saving
scheama.pre("save", function (next) {
  // Check if the password has been modified or is new
  var user = this;
  if (!user.isModified("password")) return next(); //isModified: This is useful to avoid unnecessary hashing of the password when it has not been changed.
  // Generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next();
    // Hash the password using the salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Instance method to compare a candidate password with the stored hashed password
scheama.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const employee = mongoose.model("employee", scheama);

module.exports = employee;
