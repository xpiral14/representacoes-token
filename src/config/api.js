class Api{
  static pegarRepresentacao(atributosCertificado) {
    return {
      ca: atributosCertificado.ca,
      key: atributosCertificado.key,
      cert: atributosCertificado.cert,
      host: process.env.API_HOST,
      path: "/passaporte/api/auth/representacoes",
      rejectUnauthorized: false
    };
  }

  static pegarToken(atributosCertificado, representacao) {
    return {
      ca: atributosCertificado.ca,
      key: atributosCertificado.key,
      cert: atributosCertificado.cert,
      host: process.env.API_HOST,
      path: `/passaporte/api/auth/certificado?representacao=${representacao}`,
      rejectUnauthorized: false
    };
  }
};

export default Api