
import pem from "pem";
import https from "https";
import api from "../config/api";

class RepresentacaoService {
  static obterRepresentacoes({ caminhoCertificado, senhaCertificado }, cb) {
    pem.readPkcs12(
      caminhoCertificado,
      { p12Password: senhaCertificado },
      (error, certificado) => {
        if (error) cb(error, null, null);

        let urlRepresentacao = api.pegarRepresentacao(certificado);

        let request = https.get(urlRepresentacao, res => {
          res.on("data", data => {
            //no objeto dos dados contém a suas representações (a regra passada foi que quase nenhum terá mais de um, logo o  webservice nem dá a possibilidade de escolha pegando o código da primeira representação encontrada.
            let { representacoes } = JSON.parse(data);

            //finalizar requisição
            request.end();

            //callback após obter os dados das representações. No terceiro parâmetro passo apenas a primeira representação
            cb(null, certificado, representacoes[0]);
          });

          res.on("error", error => {
            request.end();

            cb(error, null, null);
          });
        });

        request.on("error", error => {
          request.end();
          cb(error, null, null);
        });

        request.end();
      }
    );
  }
}
export default RepresentacaoService;
