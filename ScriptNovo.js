var _ccSyscareScript = function () {
    var wJsonScriptRegulacao = {}
    var wJson = {}
    var wVetor = []
    var wQtdMin

    function fTimeMachine() {
        let wMilSec = moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(wQtdMinutosInicio, "DD/MM/YYYY HH:mm:ss"));
        let wDuration = moment.duration(wMilSec);
        let wSeconds = Math.floor(wDuration.asHours()) + moment.utc(wMilSec).format("H:mm:ss");
        if (wJson['qtMin'] != '') wQtdMin = wJson['qtMin'];

        /* === preenchida ao clicar no "botão proximo"  === */
        let proximo = ccDateTime('00/00/0000 ' + wSeconds);

        if (wQtdMin) {
            let anterior = ccDateTime('00/00/0000 ' + wQtdMin)
            wJson['qtMin'] = anterior.addMilliseconds(wMilSec).toString('HH:mm:ss')
        } else {
            wJson['qtMin'] = proximo.toString('HH:mm:ss');
        }
    }

    this.limpa = async function () {
        $("[name='fme-scripts']").empty()
    }

    this.condiciona = async function (pScriptItem, pCondicional) {
        var wScript = parseInt(pScriptItem);
        var wCondicional = pCondicional;
        var wMClausulas = wCondicional.split("&&");
        var wRetornoClausula = "";

        for (let wIdx = 0; wIdx < wMClausulas.length; wIdx++) {
            var wItemClausula = wMClausulas[wIdx];
            if (wIdx > 0) wRetornoClausula += " && ";
            var wOperador = (wItemClausula.indexOf("==") >= 0) ? "==" : wItemClausula.indexOf("!=") ? "!=" : "";

            wItemClausula = wItemClausula.split(wOperador)
            let wScriptItem = wItemClausula[0];
            let wValor2 = wItemClausula[1];
            let wMScriptItemCondicional = wJsonScriptRegulacao["" + wScript + ""]["" + wScriptItem + ""] || ""
            wRetornoClausula += ` '${wMScriptItemCondicional["anResposta"]}' ${wOperador} ${wValor2} `;
        }
        return wRetornoClausula || "";
    }

    this.monta = {
        htmlCabecalho: async function (pObjReferencia) {
            cLower(pObjReferencia)
            var wData = await _ccSyscare1.busca.buscaRegulacaoScript();
            var wHtml = "";
            for (let wIdx = 0; wIdx < wData.length; wIdx++) {
                const wScript = wData[wIdx];
                wHtml += `<button data-btn-script='true' class="mx-1 ml-4 mb-2 btn cc-bg-cinza-escuro cc-text-branco upper-case" type="button" data-script="${wScript.cnRegulacaoScript}" >${wScript.nmRegulacaoScript}</button>`
            }
            $("[name='" + pObjReferencia + "']").html(`                   
                <div style="max-width: 800px;margin-left: auto;margin-right: auto;background-color:white;display: grid; " class="container-inputs" id="id-thanthan">
                    <div name="mnu-scripts-respondedor" style="display: grid; grid-template-columns: repeat(auto-fill, 186px); background-color:white;">
                    <div class="m-4">
                            <label for="cnRegulacao"><strong>Código da Regulação</strong></label>
                            <input value="" maxlength="50" name="cnRegulacao" data-interacao-tp="1" class="form-control cc-col-4" placeholder="">
                    </div>
                    <div class="m-4">
                            <label for="anRespondedor"><strong>Respondedor</strong></label>
                            <input value="" maxlength="50" name="anRespondedor" data-interacao-tp="1" class="form-control cc-col-4" placeholder="">
                    </div>
                        <div class="m-4">
                            <label for="dmSHCRegulacaoSTS"><strong>Status da Regulação</strong></label>
                            <input value="" maxlength="50" name="dmSHCRegulacaoSTS" data-interacao-tp="1" class="form-control cc-col-4" placeholder="">
                        </div>
                        <div class="m-4">
                            <label for="cnProfissional"><strong>Código do Profissional</strong></label>
                            <input value="${window.cc.global.cnProfissional}" maxlength="50" name="cnProfissional" data-interacao-tp="1" class="form-control cc-col-4" placeholder="" readonly>
                        </div>                                                                   
                    </div>
                    <hr style="background-color:white">
                    <div name="mnu-scripts" style="background-color:white">${wHtml}</div>
                    <hr style="background-color:white">
                    <div name="fme-scripts" style="background-color:white"></div>
                </div>
            `);
        },
        htmlInput: async function (pScriptItem) {
            var wScriptItem = regulacaoScript[parseInt(pScriptItem)]
            var wRotinaCarga = wScriptItem.qtInteracaoOpcao;
            var wColspan = wScriptItem.qtInteracaoColspan || 5;
            var wMaxLen = wScriptItem.qtInteracaoTamanho || 40;
            var wHtml = ""
            switch (wScriptItem.cnInteracaoTP) {
                case 1: // TEXT
                    wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">
                        ${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                    wHtml += `
                        <div class="cc-inp  cc-col cc-col-${wColspan}" style="background-color:white">
                            <div class="form-group position-relative">
                                <div>
                                    ${wScriptItem.cnInteracaoTP != 1 ? '<label for=${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto}<small>${wScriptItem.anInstrucoes}</small></label>' : ""}
                                    <input value='' name='anResposta' maxlength='${wMaxLen}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-requerido='${wScriptItem.boRequerido}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">
                                </div>
                            </div>
                        </div>

                    `;
                    break;
                case 7: // ROTINA CARGA
                    if (wRotinaCarga.substr(0, 2).toLocaleLowerCase() == "dm") {
                        /* ROTINA CARGA COMBO */
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">
                        ${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                        var wMDominioItens = _ccCombo.dm(wRotinaCarga.substr(2, 2).toLocaleLowerCase(), "", wRotinaCarga.substr(5, wRotinaCarga.length), "", "", 7);
                        wHtml += `
                            <div class="cc-inp  cc-col cc-col-${wColspan}" style="background-color:white">
                                <div class="form-group position-relative">
                                    <div>
                                        <label for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto}<small>${wScriptItem.anInstrucoes}</small></label>
                                        <select name='anResposta' data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">${wMDominioItens}</select>
                                    </div>
                                </div>
                            </div>                            
                                `;
                    }
                    break;
                case 10: // RADIO
                    if (wRotinaCarga.indexOf("{") >= 0) {
                        wRotinaCarga = JSON.parse(wRotinaCarga)
                        wMOptions = Object.getOwnPropertyNames(wRotinaCarga)
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">
                        ${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                        for (let wIdx = 0; wIdx < wMOptions.length; wIdx++) {
                            wHtml += `
                                <div class="cc-inp  cc-col cc-col-${wColspan}" style="background-color:white">
                                    <div class="form-group position-relative">
                                        <div class="form-check">
                                            <input data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' 
                                            data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' 
                                            class="form-check-input" type="radio" name="anResposta" id="flexRadioDefault2" value="${wMOptions[wIdx]}"/>
                                            <label  class="form-check-label" for="anResposta">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                        </div>
                                    </div>
                                </div>  
                                        `;
                        }
                    }
                    break;
                case 11: // CHECKBOX
                    if (wRotinaCarga.indexOf("{") >= 0) {
                        wRotinaCarga = JSON.parse(wRotinaCarga)
                        wMOptions = Object.getOwnPropertyNames(wRotinaCarga)
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">         
                        ${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>
                                 <div id='container-inputs'> `
                        for (let wIdx = 0; wIdx < wMOptions.length; wIdx++) {
                            wHtml += `
                                <div class="cc-inp cc-col cc-col-${wColspan}" style="background-color:white">
                                    <div class="form-group position-relative">
                                        <input data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' 
                                            data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' 
                                            class="form-check-input" type="checkbox" name="anResposta" id="${wMOptions[wIdx]}" />
                                            <label  class="form-check-label" for="anResposta">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                    </div>
                                </div>
                                `;
                        }
                        wHtml += `</div>`
                    }
                    break;
                default:
                    break;
            }
            return wHtml;
        },

        buttonAnterior: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            var wHtmlAnterior = `<div class=" cc-btn-col  cc-col cc-col-3  ">
                                    <button data-script-btn-anterior='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}'  data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                        <i class="fas fa-arrow-left"></i>
                                        Anterior
                                    </button>
                                </div>
                            `;
            return wHtmlAnterior
        },

        buttonProximo: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            var wHtmlProximo = `<div class=" cc-btn-col  cc-col cc-col-3  ">
                                    <button data-script-btn-proximo='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}'  data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                        <i class="fas fa-arrow-right"></i>
                                        Próximo
                                    </button>
                                </div>
                            `;
            return wHtmlProximo
        },

        htmlButtons: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            var wHtmlButtons = (pItem == 0) ? await _ccSyscare1.monta.buttonProximo(pItem) : (regulacaoScript[pItem].boScriptFim == 1) ? await _ccSyscare1.monta.buttonAnterior(pItem) : await _ccSyscare1.monta.buttonAnterior(pItem) + await _ccSyscare1.monta.buttonProximo(pItem)
            $("[name='data-buttons-script']").html(`
                <div class="cc-col w-100" style="background-color:white">
                    
                    <div class="cc-inp cc-col cc-col-16 cc-row" data-interacao-tp="1" style="float:left; ">
                        <label for="anObservacao"><strong>OBSERVAÇÃO</strong></label>
                        <textarea value="" maxlength="5000" name="anObservacao" data-script-omt='${wScriptItem.cnRegulacaoScript}'  
                        data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' data-interacao-tp="1" class="form-control" placeholder="" style="height: 70px"></textarea>
                    </div>
                    <div data-obj-seq="100" class="cc-row" style="border-color: rgb(0 0 0 / 40%); " id="data-buttons-principal">
                        ${wHtmlButtons}
                    </div>
                    <div class=" cc-btn-col  cc-col cc-col-4 mr-3" style="float: right; ">
                        <button data-script-btn-finalizar='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}' data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block cc-bg-verde cc-text-branco m-3 cc-bg-preto cc-text-branco m-3" >
                            FINALIZAR
                        </button>
                    </div>
                </div>
            `);

        },

        montaJson: async function (pScriptCodigo, pScriptItem) {
            var wScriptCodigo = pScriptCodigo;
            var wScriptItem = pScriptItem;
            var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`)
            //var wValorInteracao = (wInteracaoHtm.attr("data-interacao-tp") == '10') ? $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']:checked`).val() ? (wInteracaoHtm.attr("data-interacao-tp") == '10') : wInteracaoHtm.val();
            var wValorInteracao = ""
            switch (wInteracaoHtm.attr("data-interacao-tp")) {
                case '1':
                    wValorInteracao = wInteracaoHtm.val()
                    break
                case '10':
                    wValorInteracao = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']:checked`).val()
                    break
                case '11':
                    wValorInteracao = {}
                    wValorChecado = $("[id='container-inputs'] [data-interacao-tp='11']")
                    $("[id='container-inputs'] [data-interacao-tp='11']").each(function (index, element) {
                        let wHtmItemScript = $(this);
                        wHtmItemScript.is(':checked') ? wValorInteracao["" + wHtmItemScript.attr("id") + ""] = 1 : false

                    });
                    wValorInteracao = JSON.stringify(wValorInteracao)
                    break
            }

            /* SE REQUERIDO */

            var wValorObservacao = $("[name='anObservacao']").val()
            wJson = {
                cnRegulacao: $("[name='cnRegulacao']").val(), //campo na tela
                csRegulacaoMov: "",
                dmSHCRegulacaoSTS: $("[name='dmSHCRegulacaoSTS']").val(), //campo na tela
                dtInicio: "", //momento em que o script é carregado
                dtFinal: "", // momento em que o script é finalizado
                qtMin: '', // dtFinal - dtInicio
                cnRegulacaoScript: wScriptCodigo,
                csRegulacaoScriptItem: wScriptItem,
                cnProfissional: $("[name='cnProfissional']").val(), //Profissional que está fazendo as perguntas?
                anPergunta: $(`[for='${wScriptCodigo}-${wScriptItem}']`).text(),
                dtPergunta: "", //momento em que a pergunta foi aberta
                anRespondedor: $("[name='anRespondedor']").val(), //campo na tela
                dtResposta: "", //momento em que a pergunta foi respondida ou momento em que foi clicado em 'proximo'?
                anResposta: _cc.string.valor(wValorInteracao),
                anOBS: wValorObservacao,
            };

            wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""] = wJson;
        }
    }

    this.listen = {
        clickScript: async function () {
            $(document).off(cc.evento.click, "[data-btn-script='true']");
            $(document).on(cc.evento.click, "[data-btn-script='true']", async function () {
                await _ccSyscare1.busca.buscaRegulacaoScriptItens($(this).attr("data-script"))
            });
        },

        clickItem: async function () {
            $(document).off(cc.evento.blur, "[data-script-omt-item]");
            $(document).on(cc.evento.blur, "[data-script-omt-item]", function () {
                var wScriptCodigo = $(this).attr("data-script-omt");
                var wScriptItem = $(this).attr("data-script-omt-item");
                var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`);
                var wValorInteracao = wInteracaoHtm.attr("data-interacao-tp") == "10" ? $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']:checked`).val() : wInteracaoHtm.val();
                var wValorObservacao = $("[name='anObservacao']").val()

                return wValorInteracao, wValorObservacao;
            });
        },

        clickProximo: async function () {
            $(document).off(cc.evento.click, "[data-script-btn-proximo='true']");
            $(document).on(cc.evento.click, "[data-script-btn-proximo='true']", function () {

                var wIdxScriptItem = $(this).attr("data-script-btn-omt-index");
                var wScriptItem = $(this).attr("data-script-btn-omt-item");
                var wScriptCodigo = $(this).attr("data-script-btn-omt");
                var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`)
                var wValorInteracao = (wInteracaoHtm.attr("data-interacao-tp") == '10') ? $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']:checked`).val() : wInteracaoHtm.val();
                /* SE REQUERIDO */
                if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
                    if (!wValorInteracao || wValorInteracao == "") {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("<p class='text-center' style='color:white;font-size:16px;'>Requerido</p>", 20, alertify.get('notifier', 'position'));
                        return;
                    }
                }

                _ccSyscare1.monta.montaJson(wScriptCodigo, wScriptItem);

                if (wVetor.length >= 0) wVetor = []

                /* === CHAMA FUNÇÃO PARA TRATAR OS MINUTOS ====*/
                fTimeMachine()

                var wJsonLength = Object.getOwnPropertyNames(wJsonScriptRegulacao).length;

                for (let wIdx = 0; wIdx < wJsonLength; wIdx++) {
                    const element = Object.getOwnPropertyNames(wJsonScriptRegulacao)[wIdx];
                    var wMItens = Object.getOwnPropertyNames(wJsonScriptRegulacao["" + element + ""]);
                    for (let wIdx2 = 0; wIdx2 < wMItens.length; wIdx2++) {
                        let wAjaxJson = {
                            cnRegulacao: wJsonScriptRegulacao[element][wMItens[wIdx2]]["cnRegulacao"],
                            csRegulacaoMov: wJsonScriptRegulacao[element][wMItens[wIdx2]]["csRegulacaoMov"],
                            dmSHCRegulacaoSTS: wJsonScriptRegulacao[element][wMItens[wIdx2]]["dmSHCRegulacaoSTS"],
                            dtInicio: wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtInicio"],
                            dtFinal: wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtFinal"],
                            qtMin: "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["qtMin"] + "",
                            cnRegulacaoScript: element,
                            csRegulacaoScriptItem: wMItens[wIdx2],
                            cnProfissional: "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["cnProfissional"] + "",
                            anPergunta: "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anPergunta"] + "",
                            dtPergunta: wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtPergunta"],
                            anRespondedor: "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anRespondedor"] + "",
                            anResposta: "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anResposta"] + "",
                            dtResposta: wJsonScriptRegulacao[element][wMItens[wIdx2]]["dtResposta"],
                            anOBS: "" + wJsonScriptRegulacao[element][wMItens[wIdx2]]["anOBS"] + "",
                        }
                        wVetor.push(wAjaxJson);
                        wQtdMin = ''
                    }
                }
                console.log(wVetor);
                debugger
                _ccSyscare1.cria(parseInt(++wIdxScriptItem))
            })
        },

        clickAnterior: async function () {
            $(document).off(cc.evento.click, "[data-script-btn-anterior='true']");
            $(document).on(cc.evento.click, "[data-script-btn-anterior='true']", async function () {
                fTimeMachine()

                try {
                    var wIdxScriptItem = $(this).attr("data-script-btn-omt-index") - 1;
                    //var wScriptItem = $(this).attr("data-script-btn-omt-item") - 1;
                    debugger
                    _ccSyscare1.cria(wIdxScriptItem, "desc")
                    //_ccSyscare1.cria(wScriptItem - 1, "desc")
                } catch (error) {
                    console.error(error);
                }
            })
        },

        clickFinalizar: async function () {
            let wSaveUrl = cc.url.ccasegd_token + "tabela=shcregulacaomov";
            let wSaveMthd = "post";

            $(document).off(cc.evento.click, "[data-script-btn-finalizar='true']");
            $(document).on(cc.evento.click, "[data-script-btn-finalizar='true']", async function () {
                var wScriptItem = $(this).attr("data-script-btn-omt-item"),
                    wScriptCodigo = $(this).attr("data-script-btn-omt");

                var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`)
                var wValorInteracao = (wInteracaoHtm.attr("data-interacao-tp") == '10') ? $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']:checked`).val() : wInteracaoHtm.val();
                if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
                    if (!wValorInteracao || wValorInteracao == "") {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("<p class='text-center' style='color:white;font-size:16px;'>Requerido</p>", 20, alertify.get('notifier', 'position'));
                        return;
                    }
                }
                _ccSyscare1.monta.montaJson(wScriptCodigo, wScriptItem)
                wVetor.length != 0 ? (wVetor) : (wVetor.push(wJsonScriptRegulacao[wScriptCodigo][wScriptItem]))

                for (let wIdx3 = 0; wIdx3 < wVetor.length; wIdx3++) {
                    await _cc.ajax(wSaveUrl, wSaveMthd, "application/json", JSON.stringify(wVetor[wIdx3]), "", "").then((result) => {
                        console.log("DATA RESULT: ", result);
                        if (result.cnRetorno != 0) {
                            _cc.msg("Erro ao Salvar!!", "danger")
                            console.error(result.anMensagem)
                        } else {
                            _cc.msg("Registro(s) Incluído(s) com sucesso!", "success")
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }

                wVetor = [];
                await _ccSyscare1.limpa()
                _ccSyscare1.cria(0)
            });
        }
    }

    this.busca = {
        buscaRegulacaoScript: async function () {
            var wTabelaNome = "shcregulacaoscript"
            var wJsn = `{
                obj : '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabelaNome + "&colunas=cnRegulacaoScript,nmRegulacaoScript,dsRegulacaoScript,anRegulacaoTema"), +1, 10, 0, 0, 1)}'
            }`;
            var wAjaxURI = _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsn);
            return await $.when(wAjaxURI).then(
                async function (jsonRespObj) {
                    try {
                        /** VALIDA DATARESULT */
                        _cc.validaResultadoAjax(jsonRespObj);
                        var wData = jsonRespObj.data;
                        return wData;
                    } catch (error) {
                        console.error("error:", error);
                    }
                }
            )
        },

        buscaRegulacaoScriptItens: async function (pScript) {
            var wTabelaNome = "shcregulacaoscriptitem"
            var wColunas =
                "cnRegulacaoScript, csRegulacaoScriptItem, nrOrdem, anInteracaoTexto, cnInteracaoTP,qtInteracaoTamanho,qtInteracaoOpcao,anInteracaoCondicional ";
            wColunas +=
                ",anInstrucoes,anDirecionamentoCondicional,cnDirecionamentoScript,cnDirecionamentoScriptItem,boScriptFim,boRequerido,qtInteracaoColspan";
            var wJsnObjScriptItem = `{
                    obj : '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabelaNome + "&colunas=" + wColunas + "&orderby=nrOrdem&where=cnRegulacaoScript=" + pScript), +1, 10, 0, 0, 1)}'
                }`;
            wJsonScriptRegulacao["" + pScript + ""] = (wJsonScriptRegulacao["" + pScript + ""]) ? wJsonScriptRegulacao["" + pScript + ""] : {};

            var wAjaxScriptItem = await _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsnObjScriptItem);
            return $.when(wAjaxScriptItem).then(
                async function (jsonScriptItem) {
                    /* VALIDA DATARESUL */
                    _cc.validaResultadoAjax(jsonScriptItem);
                    var wData = jsonScriptItem.data;
                    wHtml = `
                        <div class="">                               
                            <div class="p-1 mt-2" name="data-conteudo-script">
                            </div>
                            <div class="p-1" name="data-buttons-script" >
                            </div>
                        </div>
                        `;
                    $("[name='fme-scripts']").html(wHtml);
                    window.regulacaoScript = wData
                    console.log("regulacaoScript");
                    console.log(regulacaoScript);
                    _ccSyscare1.cria(0)
                })
        }
    }

    this.inicia = async function (pObjReferencia) {
        await _ccSyscare1.monta.htmlCabecalho(pObjReferencia)
        await _ccSyscare1.listen.clickScript()
    }

    this.cria = async function (pItem, pBoDesc) {
        console.log("MONTA ITEM --> ", pItem);
        _ccSyscare1.listen.clickProximo()
        _ccSyscare1.listen.clickAnterior()
        _ccSyscare1.listen.clickItem()
        _ccSyscare1.listen.clickFinalizar()

        pItem = parseInt(pItem)
        pItem > 0 && $("[name='anRespondedor']").val() ? $("[name='anRespondedor']").attr("readonly", true) : $("[name='anRespondedor']").attr("readonly", false);
        var wScriptItem = regulacaoScript[pItem];
        console.log(wScriptItem.anInteracaoCondicional);
        debugger
        if (wScriptItem.anInteracaoCondicional) {
            console.log("DATA ---> ", wScriptItem.anInteracaoCondicional);
            var wClausula = await _ccSyscare1.condiciona(wScriptItem.cnRegulacaoScript, wScriptItem.anInteracaoCondicional)
            // console.log("wClausula ",wClausula);
            if (!eval(wClausula)) {
                if (regulacaoScript.length == wScriptItem + 1) {
                    $("[name='data-buttons-script']").html('<div ><button type="button"  onclick="alert(\'fim\')" class="cc-btn btn btn-block  cc-bg-verde cc-text-branco cc-bg-preto cc-text-branco m-3 ">FINALIZAR</button></div>')
                    return
                } else {
                    /* REMOVE RESPOSTA SALVA */
                    delete wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]

                    /** TERNÁRIO */
                    pBoDesc ? _ccSyscare1.cria(pItem - 1) : _ccSyscare1.cria(pItem + 1);
                    return
                }
            }
        }
        debugger
        var wHtmScriptItem = await _ccSyscare1.monta.htmlInput(pItem);

        /* APPEND HTML  */

        $("[name='data-conteudo-script']").html(wHtmScriptItem);
        // console.log("wScriptRegulacao ", wScriptRegulacao);
        await _ccSyscare1.monta.htmlButtons(pItem)
        var wScriptRegulacao = wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""];

        if (wScriptRegulacao) {
            var wInteracaoValor = wScriptRegulacao["anResposta"]
            var wObservacaoValor = wScriptRegulacao["anOBS"]
            /** SE JÁ TIVER VALOR SALVO */
            if (wInteracaoValor) {
                var wInteracaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='anResposta']`);
                (wInteracaoHtm.attr("data-interacao-tp") == '10') ?
                    $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][value='${wInteracaoValor}']`).attr('checked', true) :
                    //(wInteracaoHtm.attr("data-interacao-tp") == '10') ? $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}']`).pr
                    wInteracaoHtm.val(wInteracaoValor);
            }

            if (wObservacaoValor) {
                var wObservacaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='anObservacao']`);
                wObservacaoHtm.val(wObservacaoValor);
            }
        }

        wQtdMinutosInicio = moment().format('DD/MM/YYYY HH:mm:ss');
        console.log(wQtdMinutosInicio)
    }
}
var _ccSyscare1 = new _ccSyscareScript();
_ccSyscare1.inicia('frmshc.paginaprincipal')