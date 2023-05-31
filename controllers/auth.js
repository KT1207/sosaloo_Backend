const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
  const { email, nickname, password, WriteBool } = req.body;
  console.log("email : " + email);
  console.log("nickname : " + nickname);
  console.log("password : " + password);
  console.log("WriteBool : " + WriteBool);
  try {
    const exUser = await User.findOne({ where: { name: nickname } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      name: nickname,
      password: hash,
      WriteBool,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500);
    console.log("저기");
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    console.log("authError : " + authError);
    console.log("user : " + user);
    console.log("info : " + info);
    if (authError) {
      return next(authError);
    }

    if (!user) {
      return res
        .status(400)
        .send(`/?loginError=${info.message} // ${res.data} : login에러`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        res.status(400).send(`${res.data} : login에러`);
        return next(loginError);
      }
      return res.status(200).send(`${res.data} : login`);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
