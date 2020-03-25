import https from "https";
import obterRepresentacoes from "../../codigoParaPegarRepresentacao";
import api from "../config/api";
class RepresentacaoController {
  static obterToken(req, res, next) {
    const caminhoCertificado = "temp/" + req.file.filename;
    const senhaCertificado = req.body.senha;
    try {
      obterRepresentacoes(
        {
          caminhoCertificado,
          senhaCertificado
        },
        // callback executada após conseguir os dados da representação do usuário
        (error, certificado, representacao) => {
          // caso haja algum erro durante a busca dos dados, retorna-o para o usuário
          if (error) return res.status(400).json(error.message);       

          // obtem o cógigo da representação obtida
          const {codigo:codigoRepresentacao} = representacao
          
          //monta a url para buscar o token para a representação do usuário
          const urlToken = api.pegarToken(
            certificado,
            codigoRepresentacao
          );

          // envia uma requisição para o servidor
          let requisicao = https.get(urlToken, respostaRequisicao => {
            //evento que captura quandosos dados chegam
            respostaRequisicao.on("data", dados => {
              //finaliza a requisição de modo seguro.
              requisicao.end();

              // o objeto retornado contém várias informações, mas como só o token é necessário envia somente ele para o usuário.
              return res.json(JSON.parse(dados).token.valor);
            });

            // caso ocorra algum erro durante o período de obter a resposta, retorna-o para o usuário.
            respostaRequisicao.on("error", erroResposta => next(erroResposta));
          });

          // caso ocorra algum erro ao fazer a requisição, retorna o erro para o usuário.
          requisicao.on("error", erroRequisicao => next(erroRequisicao));
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

export default RepresentacaoController;
