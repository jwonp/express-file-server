const FileExpress = require("express");
const fileUpload = require("express-fileupload");
const appRoot = require("app-root-path").path;
const fs = require("fs");
const FileRouter = FileExpress.Router();
import { rename } from "node:fs";

FileRouter.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    uriDecodeFileNames: true,
  })
);
FileRouter.post(
  "/uploadImage",
  FileExpress.json({
    limit: "50mb",
  }),
  (req: any, res: any) => {
    const sampleFile = req.files.image;
    const fileExtension = req.body.name;

    const renamedFileName = `${Date.now()}.${fileExtension}`;
    const uploadPath = appRoot + "/public/upload/" + renamedFileName;

    sampleFile.mv(uploadPath, function (err: any) {
      if (err) return res.status(500).send(err);
      res.json(`http://localhost:8888/static/upload/${renamedFileName}`);
    });
  }
);
//
module.exports = FileRouter;
export {};
