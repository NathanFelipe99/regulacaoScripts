var wJsonRegulacao = {
    "2": {
        "1": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Realizou a medição da temperatura corporal?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "S",
            "dtResposta": "",
            "anOBS": ""
        },
        "2": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Já fez a administração de algum medicamento?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "S",
            "dtResposta": "",
            "anOBS": ""
        },
        "3": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Qual medicamento?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "teste",
            "dtResposta": "",
            "anOBS": ""
        },
        "4": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Sente dores no corpo?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "N",
            "dtResposta": "",
            "anOBS": ""
        },
        "7": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Apresenta algum outro sintoma?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "S",
            "dtResposta": "",
            "anOBS": ""
        },
        "8": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Qual sintoma?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "nausea",
            "dtResposta": "",
            "anOBS": ""
        },
        "9": {
            "cnRegulacao": "",
            "csRegulacaoMov": "",
            "dmSHCRegulacaoSTS": "",
            "dtInicio": "",
            "dtFinal": "",
            "qtMin": "5",
            "cnRegulacaoScript": "",
            "cnRegulacaoScriptItem": "",
            "cnProfissional": "15",
            "anPergunta": "Faz uso de medicamento controlado?",
            "dtPergunta": "",
            "anRespondedor": "NATHAN",
            "anResposta": "N",
            "dtResposta": "",
            "anOBS": ""
        }
    }
}

let wSaveUrl = cc.url.ccasegd_token + "tabela=shcregulacaomov"
let wSaveMthd = "post";
var wJsonLength = Object.getOwnPropertyNames(wJsonRegulacao).length
for (let wIdx = 0; wIdx < wJsonLength; wIdx++) {
    const element = Object.getOwnPropertyNames(wJsonRegulacao)[wIdx];
    console.log(element);
    console.log(wJsonRegulacao[element]);
    // console.log("Script", element);
    var wMItens = Object.getOwnPropertyNames(wJsonRegulacao["" + element + ""])
    console.log(wMItens);
    for (let wIdx2 = 0; wIdx2 < wMItens.length; wIdx2++) {
        console.log(wJsonRegulacao[element]);
        console.log([wMItens["cnRegulacao"]]);
        let wJson = {
            "cnRegulacao": wJsonRegulacao[element][wMItens[wIdx2]]["cnRegulacao"],
            "csRegulacaoMov": wJsonRegulacao[element][wMItens[wIdx2]]["csRegulacaoMov"],
            "dmSHCRegulacaoSTS": wJsonRegulacao[element][wMItens[wIdx2]]["dmSHCRegulacaoSTS"],
            "dtInicio": wJsonRegulacao[element][wMItens[wIdx2]]["dtInicio"],
            "dtFinal": wJsonRegulacao[element][wMItens[wIdx2]]["dtFinal"],
            "qtMin": wJsonRegulacao[element][wMItens[wIdx2]]["qtMin"],
            "cnRegulacaoScript": element,
            "csRegulacaoScriptItem": wMItens[wIdx2],
            "cnProfissional": wJsonRegulacao[element][wMItens[wIdx2]]["cnProfissional"],
            "anPergunta": "" + wJsonRegulacao[element][wMItens[wIdx2]]["anPergunta"] + "",
            "dtPergunta": wJsonRegulacao[element][wMItens[wIdx2]]["dtPergunta"],
            "anRespondedor": "" + wJsonRegulacao[element][wMItens[wIdx2]]["anRespondedor"] + "",
            "anResposta": "" + wJsonRegulacao[element][wMItens[wIdx2]]["anResposta"] + "",
            "dtResposta": wJsonRegulacao[element][wMItens[wIdx2]]["dtResposta"],
            "anOBS": "" + wJsonRegulacao[element][wMItens[wIdx2]]["anOBS"] + ""
        }
        console.log(wJsonRegulacao[element][wMItens["anRespondedor"]]);
        console.log(wJson);
        _cc.ajax(wSaveUrl, wSaveMthd, "application/json", JSON.stringify(wJson), "", "").then((result) => {
            console.log("DATA RESULT")
            console.table(result)
        }).catch((err) => {
            console.log(err)
        });
    }
}

