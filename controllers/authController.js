const User = require("./../models/userModel");
const { promisify } = require("util"); // yra jau toks, siųstis nereikia
const jwt = require("jsonwebtoken");

// const signToken = (id) => {
//   return jwt.sign({ id }, "labas", {
//     expiresIn: "90d",
//   });
// };

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, "labas", {
      expiresIn: "90d",
    });

    console.log("Signup tokenas");
    console.log(token);

    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Ar yra vartotojo vardas ir slaptažodis
  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Neįvestas prisijungimo vardas arba slaptažodis.",
    });
  }

  // 2) Randame vartotoja ir patikrinsime ar tinka passwordas
  const user = await User.findOne({ email }).select("+password");

  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(404).json({
      status: "fail",
      message: "Neteisingas prisijungimo vardas arba slaptažodis",
    });
  }

  const token = jwt.sign({ id: user._id }, "labas", {
    expiresIn: "90d",
  });

  console.log("Login tokenas");
  console.log(token);

  res.status(200).json({
    status: "success",
    token: token,
  });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, "labas");
  console.log(decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};
