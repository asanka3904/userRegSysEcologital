const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");

const signIn = (req, res) => {
  //Form Valdiation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by Email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

const register = (req, res) => {
  //Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      // Hash password before storing in database
      const rounds = 10;
      bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

const userDetail = (req, res) => {
  //verify token and decode
  jwt.verify(req.token, process.env.secretOrKey, (err, data) => {
    if (err) {
      return res.status(403);
    }
    console.log(data);

    User.find({})
      .select(["-password", "-__v"])
      .then((user) => {
        return res.status(200).json(user);
        console.log("data");
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

//get user by id
const getuserDetailbyId = (req, res) => {
  jwt.verify(req.token, process.env.secretOrKey, (err, data) => {
    if (err) {
      return res.status(403);
    }

    if (data.role !== "admin") {
      return res.status(403);
    }
    User.findById(req.params.id)
      .select(["-password", "-__v"])
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

//update user by id
const updateUserDetailbyId = (req, res) => {
  const { name, email } = req.body;
  jwt.verify(req.token, process.env.secretOrKey, (err, data) => {
    if (err) {
      return res.status(403);
    }

    User.findByIdAndUpdate(req.params.id, {
      name,
      email,
    })
      .then((user) => {
        return res.status(200);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

//delete user by id
const deleteUserDetailbyId = (req, res) => {
  //Form Valdiation

  jwt.verify(req.token, process.env.secretOrKey, (err, data) => {
    if (err) {
      return res.status(403);
    }

    if (data.role == "admin") {
      User.findByIdAndDelete(req.params.id)
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      return res.status(403);
    }
  });
};

module.exports = {
  signIn,
  register,
  userDetail,
  getuserDetailbyId,
  updateUserDetailbyId,
  deleteUserDetailbyId,
};
