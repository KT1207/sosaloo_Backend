const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { afterUploadImage, uploadPost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      console.log("file destination", file);
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      console.log("file filename", file);
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

// POST /post/novelImg
router.post(
  "/novelImg",
  (req, res, next) => {
    // console.log(req);
    console.log("req.body", req.body);
    // console.log(req.file);
    next();
  },
  upload.single("file"),
  afterUploadImage,
  uploadPost
);

// POST /post
const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

// router.post("/upload", upload.single("file"), function (req, res) {
//   const filename = req.file?.filename || "";
//   try {
//     const { title, content, name, email } = req.body;
//     Board.create({ title, content, name, email, filename });
//     res.send("File uploaded successfully!");
//   } catch (e) {
//     console.log(e);
//   }
// });
module.exports = router;
