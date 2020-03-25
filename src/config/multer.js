import multer from "multer";
import path from "path";
//configuração para armazenar os arquivos recebidos nas requisições.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    let extensaoArquivo = path.extname(file.originalname);
    if (extensaoArquivo !== ".pfx")
      return cb(
        new Error("O arquivo deve ser um certificado com a extensão .pfx")
      );

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});

export default upload;
