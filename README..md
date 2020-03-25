No ambiente de testes, tem que chamar este endpoint para obter as representações: https://testes.tcm.go.gov.br:8443/passaporte/api/auth/representacoes

Essa chamada acima vai retornar um JSON com todas as representações que a pessoa de acordo com o certificado digital fornecido possui (Exemplo de representação: Gestor do órgão X). Após isso, ela tem que escolher qual o código de representação ela quer obter o token.

Para o token, o endpoint é este: 	https://testes.tcm.go.gov.br:8443/passaporte/api/auth/certificado?representacao={numero da representação}

Naquela primeira chamada tem que passar o certificado digital
