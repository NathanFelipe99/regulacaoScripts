function fClausula(pScript, pCondicional) {
    var wScript = parseInt(pScript);
    var wCondicional = pCondicional;
    var wMClausulas = wCondicional.split("&&");
    var wRetornoClausula = " ";
    for (let wIdx = 0; wIdx < wMClausulas.length; wIdx++) {
        var wItemClausula = wMClausulas[wIdx];
        if (wIdx > 0) wRetornoClausula += " && ";
        var wOperador = (wItemClausula.indexOf("==") >= 0) ? "==" : wItemClausula.indexOf("!=") ? "!=" : "";

        wItemClausula = wItemClausula.split(wOperador)
        let wScriptItem = wItemClausula[0];
        let wValor2 = wItemClausula[1];
        let wMScriptItemCondicional = wJsonScriptRegulacao["" + wScript + ""]["" + wScriptItem + ""]  || {}
        wRetornoClausula += ` '${wMScriptItemCondicional["value"]}' ${wOperador} ${wValor2} `;
    }
    return wRetornoClausula;
}



function fMontaScript(wItem, pBoDesc) {
    wItem = parseInt(wItem)
    var wScriptItem = richardScript[wItem];

    var wRotinaCarga = wScriptItem.qtInteracaoOpcao;
    var wColspan = wScriptItem.qtInteracaoColspan || 5;
    var wMaxLen = wScriptItem.qtInteracaoTamanho || 50;
    var wHtml = ""
    if (wScriptItem.anInteracaoCondicional) {
        //alert(2)
        var wClausula = fClausula(wScriptItem.cnRegulacaoScript, wScriptItem.anInteracaoCondicional)
        console.log("wClausula ",wClausula);
        if (!eval(wClausula)) {
            if (richardScript.length == wItem + 1) {
                $("[name='data-buttons-script']").html('<div ><button type="button"  onclick="alert(\'Fim\')" class="cc-btn btn btn-block  cc-bg-verde cc-text-branco cc-bg-preto cc-text-branco m-3 ">FINALIZAR</button></div>')
                return
            } else {
                /* REMOVE RESPOSTA SALVA */
                delete wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]
                /* MONTA PROXIMA PERGUNTA */
                if(pBoDesc){
                    console.log("monta desc");
                    fMontaScript(wItem - 1)
                }else{
                    fMontaScript(wItem + 1)
                }
                return
            }

        }
    }

    switch (wScriptItem.cnInteracaoTP) {
        case 1: // TEXT
            wHtml += `
                <div class="cc-inp  cc-col cc-col-${wColspan}" style="">
                    <div class="form-group position-relative">
                        <div>
                            <label for="inputResposta">${wScriptItem.anInteracaoTexto}<small>${wScriptItem.anInstrucoes}</small></label>
                            <input name="inputResposta" maxlength='${wMaxLen}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-requerido='${wScriptItem.boRequerido}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">
                        </div>
                    </div>
                </div>

            `
            break;
        case 7:// ROTINA CARGA
            if (wRotinaCarga.substr(0, 2).toLocaleLowerCase() == "dm") {
                /* ROTINA CARGA COMBO */
                var wMDominioItens = _ccCombo.dm(wRotinaCarga.substr(2, 2).toLocaleLowerCase(), "", wRotinaCarga.substr(5, wRotinaCarga.length), "", "", 7);
                wHtml += `

                        <div class="cc-inp  cc-col cc-col-${wColspan}" style="">
                            <div class="form-group position-relative">
                                <div>
                                    <label for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto}<small>${wScriptItem.anInstrucoes}</small></label>
                                    <select data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">${wMDominioItens}</select>
                                </div>
                            </div>
                        </div>                            
                            `
            }
            break;
        case 10:// RADIO
            break;
        case 11:// CHECKBOX
            if (wRotinaCarga.indexOf("{") >= 0) {
                wRotinaCarga = JSON.parse(wRotinaCarga)
                wMOptions = Object.getOwnPropertyNames(wRotinaCarga)
                wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto}</h4>`
                for (let wIdx = 0; wIdx < wMOptions.length; wIdx++) {
                    wHtml += `
                        
                            <div class="cc-inp  cc-col cc-col-${wColspan}" style="">
                                <div class="form-group position-relative">
                                    <div class="form-check">
                                    <input data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}'  data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="${wMOptions[wIdx]}"/>
                                    <label  class="form-check-label" for="flexRadioDefault2">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                    </div>
                                </div>
                            </div>  

                                `
                }
            }
            break;
        default:
            break;
    }
    $("[name='data-conteudo-script']").html(wHtml);

    if (wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]) {
        var wInteracaoValor = wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]["value"];
        /* SE JA TIVER VALOR SALVO */
        if (wInteracaoValor) {
            var wInteracaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}']`);
            (wInteracaoHtm.attr("data-interacao-tp") == '11') ? $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][value='${wInteracaoValor}']`).attr('checked', true) : wInteracaoHtm.val(wInteracaoValor);
        }
    }



    if (richardScript.length == wItem + 1) {
        /*
        $("[name='data-buttons-script']").html(`
            <div style="" class="cc-col w-100  ">
                <div data-obj-seq="100"  class=" cc-row" style=" border-color: rgb(0 0 0 / 40%)  ; ">
                    <div class=" cc-btn-col  cc-col cc-col-3  ">
                        <button class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                            <i class="fas fa-arrow-left"></i>
                            Anterior
                        </button>
                    </div>
                    <div class=" cc-btn-col  cc-col cc-col-4  " style=" float: right;">
                        <button class="cc-btn btn btn-block  cc-bg-verde cc-text-branco m-3 cc-bg-preto cc-text-branco m-3"
                            onclick="alert(\'fim\')">
                            FINALIZAR
                        </button>
                    </div>
                </div>
            </div>
            `)
            */
    } else {
        $("[name='data-buttons-script']").html(`

                <div style="" class="cc-col w-100  ">
                    <div data-obj-seq="100"  class=" cc-row" style=" border-color: rgb(0 0 0 / 40%)  ; ">
                        <div class=" cc-btn-col  cc-col cc-col-3  ">
                            <button data-script-btn-anterior='true' data-script-btn-omt-index='${wItem}'data-script-btn-omt='${wScriptItem.cnRegulacaoScript}'  data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                <i class="fas fa-arrow-left"></i>
                                Anterior
                            </button>
                        </div>
                        <div class=" cc-btn-col  cc-col cc-col-3  ">
                            <button data-script-btn-proximo='true' data-script-btn-omt-index='${wItem}'data-script-btn-omt='${wScriptItem.cnRegulacaoScript}'  data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                <i class="fas fa-arrow-right"></i>
                                Próximo
                            </button>
                        </div>
                        <div class=" cc-btn-col  cc-col cc-col-4  " style=" float: right;">
                            <button data-script-btn-finalizar='true' class="cc-btn btn btn-block  cc-bg-verde cc-text-branco m-3 cc-bg-preto cc-text-branco m-3" >
                                FINALIZAR
                            </button>
                        </div>
                    </div>
                </div>
            `)
    }
}
window.wJsonScriptRegulacao = {}
wTabelaNome = "shcregulacaoscript"
var wJsn = `{
                    obj : '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabelaNome + "&colunas=cnRegulacaoScript,nmRegulacaoScript,dsRegulacaoScript,anRegulacaoTema"), +1, 10, 0, 0, 1)}'
                }`;

wAjaxURI = _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsn);
$.when(wAjaxURI).then(
    async function (jsonRespObj) {
        try {
            /* VALIDA DATARESUL */
            _cc.validaResultadoAjax(jsonRespObj);
            var wData = jsonRespObj.data;
            var wHtml = "";
            for (let wIdx = 0; wIdx < wData.length; wIdx++) {
                const wScript = wData[wIdx];
                wHtml += `<button data-btn-script='true' class="mx-1 btn cc-bg-cinza-escuro cc-text-branco upper-case" type="button" data-script="${wScript.cnRegulacaoScript}" >${wScript.nmRegulacaoScript}</button>`
            }
            $("[name='frmshc.paginaprincipal']").html(`
                    <div style="max-width: 800px;margin-left: auto;margin-right: auto;background:white;" >
                        <div name="mnu-scripts">${wHtml}</div>
                        <hr>
                        <div name="fme-scripts"></div>
                    </div>
                `)
            /* VARIAVEL SALVAR */


            $(document).off(cc.evento.click, "[data-btn-script='true']");
            $(document).on(cc.evento.click, "[data-btn-script='true']", function () {
                var wScriptCodigo = $(this).attr("data-script")
                var wTabelaNome = "shcregulacaoscriptitem"
                var wColunas = "cnRegulacaoScript,csRegulacaoScriptItem,nrOrdem,anInteracaoTexto,cnInteracaoTP,qtInteracaoTamanho,qtInteracaoOpcao,anInteracaoCondicional,anInstrucoes,boRequerido,qtInteracaoColspan"
                var wJsnObjScriptItem = `{
                        obj : '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabelaNome + "&colunas=" + wColunas + "&orderby=nrOrdem&where=cnRegulacaoScript=" + wScriptCodigo), +1, 10, 0, 0, 1)}'
                    }`;
                wJsonScriptRegulacao["" + wScriptCodigo + ""] = (wJsonScriptRegulacao["" + wScriptCodigo + ""]) ? wJsonScriptRegulacao["" + wScriptCodigo + ""] : {};
                wAjaxScriptItem = _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsnObjScriptItem);
                $.when(wAjaxScriptItem).then(
                    async function (jsonScriptItem) {
                        try {
                            /* VALIDA DATARESUL */
                            _cc.validaResultadoAjax(jsonScriptItem);
                            var wData = jsonScriptItem.data;
                            wHtml = `
                                        <div class="">
                                            <div class="p-1" name="data-conteudo-script">
                                            </div>
                                            <div class="p-1" name="data-buttons-script" >
                                            
                                            </div>
                                        </div>
                                        `
                            $("[name='fme-scripts']").html(wHtml);
                            window.richardScript = wData
                            fMontaScript(0)

                        } catch (error) {
                            console.log("error")
                            console.log(error);
                        }
                    })
            })
        } catch (error) {
            console.log(error, error); 
        }
    })



$(document).off(cc.evento.click, "[data-script-btn-proximo='true']");
$(document).on(cc.evento.click, "[data-script-btn-proximo='true']", function () {
    var wScriptCodigo = $(this).attr("data-script-btn-omt");
    var wScriptItem = $(this).attr("data-script-btn-omt-item");
    var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`)
    var wValorInteracao = (wInteracaoHtm.attr("data-interacao-tp") == '11') ? $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']:checked`).val() : wInteracaoHtm.val();
    /* SE REQUERIDO */
    if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
        if (!wValorInteracao || wValorInteracao == "") {
            alertify.set('notifier', 'position', 'top-center');
            alertify.error("<p class='text-center' style='color:white;font-size:16px;'>Requerido</p>", 20, alertify.get('notifier', 'position'));
            return;
        }
    }

    /* SALVA SCRIPT */
    var wJson = {
        'cnRegulacao': '',
        'csRegulacaoMov': '', 
        'dmSHCRegulacaoSTS': '',
        'dtInicio': '',
        'dtFinal': '',
        'qtMin': '5',
        'cnRegulacaoScript': '',
        'cnRegulacaoScriptItem': '',
        'cnProfissional': '15',
        'anPergunta': $(`[for='${wScriptCodigo}-${wScriptItem}']`).text(),
        'dtPergunta': '',
        'anRespondedor': 'NATHAN',
        'value': _cc.string.valor(wValorInteracao),
        'dtResposta': '',
        'anOBS': ''
    }
    console.log("Json",wJson);
    //console.log("wScriptCodigo ",wScriptCodigo);
    //console.log("wScriptItem ",wScriptItem);
    console.log(wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""]);
    wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""] = wJson
    let wSaveUrl = cc.url.ccasegd_token + "tabela=shcregulacaomov"
    let wSaveMthd = "post";
    
    let wVetor = []
    var wJsonLength = Object.getOwnPropertyNames(wJsonScriptRegulacao).length
    for (let wIdx = 0; wIdx < wJsonLength; wIdx++) {
        const element = Object.getOwnPropertyNames(wJsonScriptRegulacao)[wIdx];
        console.log("Script", element);
        var wMItens = Object.getOwnPropertyNames(wJsonScriptRegulacao["" + element + ""])
        for (let wIdx2 = 0; wIdx2 < wMItens.length; wIdx2++) {
            console.log("Script Item ", wMItens[wIdx2]);
            console.log(wJsonScriptRegulacao["" + element + ""][wMItens[wIdx2]]);
            let wAjaxJson = {
                "cnRegulacao": wJsonScriptRegulacao[element][wMItens[wIdx2]]["cnRegulacao"],
                "csRegulacaoMov": wJsonScriptRegulacao[element][wMItens[wIdx2]]["csRegulacaoMov"],
                "dmSHCRegulacaoSTS": wJsonScriptRegulacao[element][wMItens[wIdx2]]["dmSHCRegulacaoSTS"],
                "dtInicio": wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtInicio"],
                "dtFinal": wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtFinal"],
                "qtMin": wJsonScriptRegulacao[element][wMItens[wIdx2]]["qtMin"],
                "cnRegulacaoScript": element,
                "csRegulacaoScriptItem": wMItens[wIdx2],
                "cnProfissional": wJsonScriptRegulacao[element][wMItens[wIdx2]]["cnProfissional"],
                "anPergunta": "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anPergunta"] + "",
                "dtPergunta": wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtPergunta"],
                "anRespondedor": "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anRespondedor"] + "",
                "anResposta": "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["value"] + "",
                "dtResposta": wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtResposta"],
                "anOBS": "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anOBS"] + ""
            }
            wVetor.push(wAjaxJson)
            console.log("VETOR", wVetor)
            $(document).off(cc.evento.click, "[data-script-btn-finalizar='true']");
            $(document).on(cc.evento.click, "[data-script-btn-finalizar='true']", async function () {
                for (let wIdx3 = 0; wIdx3 < wVetor.length; wIdx3++){
                    //console.log(wVetor.length);
                    await _cc.ajax(wSaveUrl, wSaveMthd, "application/json", JSON.stringify(wVetor[wIdx3]), "", "").then((result) => {  
                    console.log("DATA RESULT", result)
                    }).catch((err) => {
                        console.log(err)
                    });
                }
                wVetor = []
                console.log("volta pro script 1");
            })
        }
    }
    fMontaScript(parseInt($(this).attr("data-script-btn-omt-index")) + 1)
    console.log(wJsonScriptRegulacao);
})


$(document).off(cc.evento.click, "[data-script-btn-anterior='true']");
$(document).on(cc.evento.click, "[data-script-btn-anterior='true']", async function () {
    try {

        var wScriptCodigo = $(this).attr("data-script-btn-omt");
        var wScriptItem = $(this).attr("data-script-btn-omt-item") - 1;
        await fMontaScript(parseInt($(this).attr("data-script-btn-omt-index")) - 1, "desc")

        var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`);
        var wInteracaoValor = wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""]["value"];

        (wInteracaoHtm.attr("data-interacao-tp") == '11') ? $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}'][value='${wInteracaoValor}']`).attr('checked', true) : wInteracaoHtm.val(wInteracaoValor);

    } catch (error) {
        console.log(error);
    }
})