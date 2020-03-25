import api from "../config/api";
import https from "https";

class TokenService {
  static obterToken(certificado, representacao, cb) {
    // obtem o cógigo da representação obtida
    const { codigo: codigoRepresentacao } = representacao;

    //monta a url para buscar o token para a representação do usuário
    const urlToken = api.pegarToken(certificado, codigoRepresentacao);

    // envia uma requisição para o servidor
    let requisicao = https.get(urlToken, respostaRequisicao => {
      //evento que captura quandosos dados chegam
      respostaRequisicao.on("data", dados => {
        //finaliza a requisição de modo seguro.
        requisicao.end();

        // o objeto retornado contém várias informações, mas como só o token é necessário envia somente ele para o usuário.
        return cb(null, JSON.parse(dados).token.valor);
      });

      // caso ocorra algum erro durante o período de obter a resposta, retorna-o para o usuário.
      respostaRequisicao.on("error", erroResposta => {
        requisicao.end();
        cb(erroResposta, null);
      });
    });

    // caso ocorra algum erro ao fazer a requisição, retorna o erro para o usuário.
    requisicao.on("error", erroRequisicao => {
      requisicao.end();
      cb(erroRequisicao, null);
    });
  }
}

export default TokenService;
