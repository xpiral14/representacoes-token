import fs from "fs";

class SistemaService {
  static apagarCertificado(caminhoCertificado, cb) {
    return fs.unlink(caminhoCertificado, cb);
  }
}

export default SistemaService;
