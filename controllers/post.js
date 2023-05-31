const { STRING } = require("sequelize");
const Post = require("../models/post");
exports.afterUploadImage = (req, res, next) => {
  console.log("여기 오나");
  console.log(req.file);
  console.log("aa: " + req.body.aa);

  next();
  // console.log((req = "?" + JSON.stringify(req)));
  // res.json({ url: `/novelImg/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
  try {
    console.log("novelImg:" + req.file.path);
    console.log("typeof:" + typeof req.file.path);
    console.log("NovelName:" + req.body.NovelName);
    console.log("UserName:" + req.body.UserName);
    console.log("introduce:" + req.body.introduce);
    const exPosts = await Post.findOne({
      where: { NovelName: req.body.NovelName },
    });
    if (exPosts) {
      //701 : where 문제
      return res.status(701).send("존재하는 소설제목");
    }
    await Post.create({
      novelImg: req.file.path,
      UserName: req.body.UserName,
      introduce: req.body.introduce,
      NovelName: req.body.NovelName,
    });

    // const hashtags = req.body.content.match(/#[^\s#]*/ /* // 주석
    /*
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
*/
    console.log("test");
    // res.redirect("/");
    res.status(200).send("소설 생성");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.getMyPost = async (req, res, next) => {
  const exPosts = await Post.findAll({
    where: { UserName: req.body.UserName },
  });
  console.log(exPosts);
};
