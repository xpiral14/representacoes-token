import RepresentacaoService from "../services/RepresentacaoService";
import TokenService from "../services/TokenService";
import SistemaService from "../services/SistemaService";

class RepresentacaoController {
  static obterToken(req, res, next) {
    let validacoesMensagensErro = [];

    if (!req.file)
      validacoesMensagensErro.push("O envio do certificado é obrigatório.");

    if (!req.body.senha)
      validacoesMensagensErro.push("A senha do certificado é obrigatória.");

    if (validacoesMensagensErro.length > 0)
      return res.status(400).json(validacoesMensagensErro);

    const caminhoCertificado = "temp/" + req.file.filename;
    const senhaCertificado = req.body.senha;

    try {
      RepresentacaoService.obterRepresentacoes(
        {
          caminhoCertificado,
          senhaCertificado
        },
        // callback executada após conseguir os dados da representação do usuário
        (representacaoErro, certificado, representacao) => {
          if (representacaoErro) {
            SistemaService.apagarCertificado(
              caminhoCertificado,
              apagarCertificadoErro => {
                if (apagarCertificadoErro) return next(apagarCertificadoErro);
                return next(representacaoErro);
              }
            );
          }

          TokenService.obterToken(
            certificado,
            representacao,
            //callback executada após conseguir o token
            (tokenErro, token) => {
              // caso haja erro retorne-o para o usuário
              SistemaService.apagarCertificado(
                caminhoCertificado,
                apagarCertificadoErro => {
                  // caso haja um erro com o a chegada do token ou ao apagar o certifica, retorna o erro para o usuário.
                  if (apagarCertificadoErro || tokenErro) return next(erro);

                  return res.json(token);
                }
              );
            }
          );
        }
      );
    } catch (error) {
      console.log("to aqui");
      SistemaService.apagarCertificado(caminhoCertificado);
      return next(error);
    }
  }
}

export default RepresentacaoController;
