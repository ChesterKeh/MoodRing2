const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  try {
    const tasks = await User.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

const create = async (req, res) => {
  const data = req.body;

  if (data.password.trim().length < 3) {
    const error = { msg: "server password too short" };
    res.status(400).json(error);
    return;
  }

  try {
    const user = await User.create(data);
    const token = createJWT(user);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const somebody = await User.findOne({ email });

    if (somebody === null) {
      res.status(401).json({ msg: "user not found" });
      return;
    }

    const check = await bcrypt.compare(password, somebody.password);
    if (!check) {
      res.status(401).json({ msg: "wrong password" });
      return;
    }

    const token = createJWT(somebody);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAll,
  create,
  login,
};

// const jwt = require("jsonwebtoken");
// function createJWT(user) {
//   return jwt.sign(
//     // data payload
//     { user },
//     process.env.SECRET,
//     { expiresIn: "24h" }
//   );
// }

// const create = async (req, res) => {
//   const data = req.body;

//   if (data.password.trim().length < 3) {
//     const error = { msg: "server password too short" };
//     res.status(400).json(error);
//     return;
//   }

//   try {
//     const user = await User.create(data);
//     const token = createJWT(user);

//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const somebody = await User.findOne({ email });

//     if (somebody === null) {
//       res.status(401).json({ msg: "user not found" });
//       return;
//     }

//     const check = await bcrypt.compare(password, somebody.password);
//     if (!check) {
//       res.status(401).json({ msg: "wrong password" });
//       return;
//     }

//     const token = createJWT(somebody);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
