const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "nickname",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (nickname, password, done) => {
        console.log("nickname :" + nickname);
        console.log("password : " + password);
        console.log("done: " + done);
        try {
          console.log("---------------------------");
          const exUser = await User.findOne({
            where: { name: nickname },
          });

          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
        /*
        // 회사에 맟춰서 이력서 쓰기 
        // 포폴은 확실하게 기 승 전 결 혹은 두괄식 포폴
        // 경기 : 개꼴아박음
        // 개인 사업이 힘듬 => 그래도 현재 회복중 
        // 
        */
      }
    )
  );
};
