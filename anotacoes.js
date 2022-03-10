regiao
cid
sts_tipo
latitude, longitude (endereço)

getRows('', 'dashboard-paciente-ativos', ['cnPaciente', 'nmPaciente', 'cnEmpresa', 'anPacienteSTS', 'cnOrcamento', 'dtOrcamentoIni', 'dtOrcamentoFim', 'nrIdade', 'anEndereco'], 'anPacienteSTS=ALTA,anPacienteSTS=AUTORIZADO')

getRows('', 'dashboard-paciente-ativos', ['cnPaciente', 'nmPaciente', 'cnEmpresa', 'anPacienteSTS', 'anProduto', 'cnOrcamentoSTS', 'dtOrcamentoIni', 'nrIdade', 'anEndereco'], 'anPacienteSTS=ALTA,anPacienteSTS=AUTORIZADO')

getRows('', 'dashboard-paciente-ativos', ['cnPaciente', 'nmPaciente', 'cnEmpresa', 'anPacienteSTS', 'anProduto', 'cnOrcamentoSTS', 'lsEquipamentos', 'nrIdade', 'anEndereco'], 'anPacienteSTS=ALTA,anPacienteSTS=AUTORIZADO')

function calculaFaixaEtaria(pNum) {
    var faixaEtaria = Math.floor(pNum / 10)
    return faixaEtaria;
}

['cnPaciente', 'nmPaciente', 'cnPacienteSTS', 'anPacienteSTS', 'cnEmpresa', 'cnConvenio', 'nmConvenio', 'anEndereco', 'dcSexo', 'nrFaixaEtaria', 'nrIdade', 'cnProduto', 'anProduto', 'cnOrcamento', 'cnOrcamentoSTS', 'dtOrcamentoIni', 'dtOrcamentoFim', 'lsEquipamentos', 'lsMatmeds', 'lsProcedimentos']
['cnPaciente', 'nmPaciente', 'anPacienteSTS', 'cnEmpresa', 'anEndereco', 'nrIdade', 'cnOrcamento', 'dtOrcamentoIni', 'dtOrcamentoFim'] - ANTIGO;
['cnPaciente','nmPaciente','anPacienteSTS','cnEmpresa','anEndereco','nrIdade','cnOrcamento','dtOrcamentoIni','dtOrcamentoFim'] - NOVO;