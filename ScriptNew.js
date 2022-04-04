var _ccSyscareScript = function () {
    var wJsonScriptRegulacao = {}
    var wJson = {}
    var wVetor = []
    var wQtdMin
    var wQtdMinutosInicio = new Date()

    this.tempo = async function () {
        let wMilSec = moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(wQtdMinutosInicio, "DD/MM/YYYY HH:mm:ss"))
        let wDuration = moment.duration(wMilSec)
        let wSeconds = Math.floor(wDuration.asHours()) + moment.utc(wMilSec).format("H:mm:ss")
        if (wJson['qtMin'] != '') wQtdMin = wJson['qtMin']

        /* === PREENCHIDA AO CLICAR NO BOTÃO 'PRÓXIMO'  === */
        let proximo = ccDateTime('00/00/0000 ' + wSeconds)

        if (wQtdMin) {
            let anterior = ccDateTime('00/00/0000 ' + wQtdMin)
            wJson['qtMin'] = anterior.addMilliseconds(wMilSec).toString('HH:mm:ss')
        } else {
            wJson['qtMin'] = proximo.toString('HH:mm:ss')
        }
    }

    this.limpaInputs = async function () {
        for (var wIdx = 0; wIdx < wVetor.length; wIdx++) {
            $('[id="container-inputs"]').find('input').val('')
            $('[id="container-inputs"] [type="radio"]').prop('checked', false)
            $('[id="container-inputs"] [type="checkbox"]').prop('checked', false)
        }
    }

    this.condiciona = async function (pScriptItem, pCondicional) {
        var wScript = parseInt(pScriptItem)
        var wCondicional = pCondicional
        var wMClausulas = wCondicional.split("&&")
        var wRetornoClausula = ""

        for (let wIdx = 0; wIdx < wMClausulas.length; wIdx++) {
            var wItemClausula = wMClausulas[wIdx]
            if (wIdx > 0) wRetornoClausula += " && "
            var wOperador = (wItemClausula.indexOf("==") >= 0) ? "==" : wItemClausula.indexOf("!=") >= 0 ? "!=" : ""

            wItemClausula = wItemClausula.split(wOperador)
            let wScriptItem = wItemClausula[0]
            let wValor2 = wItemClausula[1]
            let wMScriptItemCondicional = wJsonScriptRegulacao["" + wScript + ""]["" + wScriptItem + ""] || ""
            wRetornoClausula += ` '${wMScriptItemCondicional["anResposta"]}' ${wOperador} ${wValor2} `
        }
        return wRetornoClausula
    }

    this.valida = async function (pInteracao) {
        /** VERIFICA SE EXISTE INTERAÇÃO OU SE A INTERAÇÃO É UMA STRING OU JSON VAZIO */
        pInteracao = _cc.string.valor(pInteracao)
        if (!pInteracao || pInteracao == ("" || "{}")) {
            console.log('bateu e ficou');
            alertify.set('notifier', 'position', 'top-right')
            alertify.error("<p class='text-center' style='color:white;font-size:16px;'>Resposta da pergunta é requerida!</p>", 20, alertify.get('notifier', 'position'))
            return false
        }
    }

    this.busca = {
        buscaRegulacaoScript: async function () {
            var wTabela = "shcregulacaoscript"
            var wJsn = `{
                obj:  '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabela + "&colunas=cnRegulacaoScript,nmRegulacaoScript,dsRegulacaoScript,anRegulacaoTema"), +1, 10, 0, 0, 1)}'
            }`
            var wAjax = await _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsn)
            return await $.when(wAjax).then(
                async function (jsonRespObj) {
                    try {
                        /** VALIDA RESULTADO DO AJAX */
                        _cc.validaResultadoAjax(jsonRespObj)
                        var wData = jsonRespObj.data
                        return wData
                    } catch (error) {
                        console.error("CATCH ERROR: ", error)
                    }
                }
            )
        },

        buscaRegulacaoScriptItens: async function (pScript, pScriptItem) {
            var wScriptItem = parseInt(pScriptItem)
            var wTabela = "shcregulacaoscriptitem"
            var wColunas = "cnRegulacaoScript, csRegulacaoScriptItem, nrOrdem, anInteracaoTexto, cnInteracaoTP,qtInteracaoTamanho,qtInteracaoOpcao,anInteracaoCondicional "
            wColunas += ",anInstrucoes,anDirecionamentoCondicional,cnDirecionamentoScript,cnDirecionamentoScriptItem,boScriptFim,boRequerido,qtInteracaoColspan"
            var wOrderBy = "nrOrdem"
            var wWhere = "cnRegulacaoScript="
            var wJsnItens = `{
                obj: '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabela + "&colunas=" + wColunas + "&orderby=" + wOrderBy + "&where=" + wWhere + pScript), +1, 10, 0, 0, 1)}'
            }`
            wJsonScriptRegulacao["" + pScript + ""] = (wJsonScriptRegulacao["" + pScript + ""]) ? (wJsonScriptRegulacao["" + pScript + ""]) : {}

            var wAjax = await _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsnItens)
            return $.when(wAjax).then(
                async function (jsonScriptItem) {
                    /* VALIDA DATARESUL */
                    _cc.validaResultadoAjax(jsonScriptItem)
                    var wData = jsonScriptItem.data
                    wHtml = `
                        <div class="">                               
                            <div class="p-1 mt-2" name="data-conteudo-script">
                            </div>
                            <div class="p-1" name="data-buttons-script" >
                            </div>
                        </div>
                        `
                    $("[name='fme-scripts']").html(wHtml)
                    window.regulacaoScript = wData;
                    //(!wScriptItem) ? _ccSyscare1.cria(0) : pBoScriptAnterior ? _ccSyscare1.cria(wDirecionaAnt) : _ccSyscare1.cria('', '', wScriptItem - 1)
                    wScriptItem ? _ccSyscare2.cria(wScriptItem) : _ccSyscare2.cria(0)
                })
        }
    }

    this.monta = {
        htmlCabecalho: async function (pObjReferencia) {
            var wData = await _ccSyscare2.busca.buscaRegulacaoScript()
            var wHtml = ""
            for (var wIdx = 0; wIdx < wData.length; wIdx++) {
                const wScript = wData[wIdx]
                wHtml += `<button data-btn-script='true' class="mx-1 ml-4 mb-2 btn cc-bg-cinza-escuro cc-text-branco upper-case" type="button" data-script="${wScript.cnRegulacaoScript}" >${wScript.nmRegulacaoScript}</button>`
            }

            $("[name='" + pObjReferencia + "']").html(`
                <div style="max-width: 800px;margin-left: auto;margin-right: auto;background-color:white;display: grid; " class="container-inputs" id="container-inputs">
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
                    <div name="mnu-scripts" style="background-color:white">${wHtml}</div>
                    <hr style="background-color:white">
                    <div name="fme-scripts" style="background-color:white"></div>
                </div>
            `)
        },

        htmlInput: async function (pScriptItem) {
            var wScriptItem = regulacaoScript[parseInt(pScriptItem)]
            var wRotinaCarga = wScriptItem.qtInteracaoOpcao
            var wColspan = wScriptItem.qtInteracaoColspan || 8
            var wMaxLen = wScriptItem.qtInteracaoTamanho || 50

            var wHtml = ""
            switch (wScriptItem.cnInteracaoTP) {
                case 1: // TEXTOS
                    wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">
                        ${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                    wHtml += `
                        <div class="cc-inp cc-col cc-col-${wColspan}" style="background-color:white">
                            <div class="form-group position-relative">
                                <div>
                                    ${wScriptItem.cnInteracaoTP != 1 ? '<label for=${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto}<small>${wScriptItem.anInstrucoes}</small></label>' : ""}
                                    <input value='' name='data-anResposta' maxlength='${wMaxLen}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-requerido='${wScriptItem.boRequerido}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">
                                </div>
                            </div>
                        </div>

                    `;
                    $('[data-script-omt="' + wScriptItem.cnRegulacaoScript +'"]').val('')
                    break

                case 7:
                    if (wRotinaCarga.substr(0, 2).toLocaleLowerCase() == "dm") {
                        /* ROTINA CARGA COMBO */
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">
                        ${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                        var wMDominioItens = _ccCombo.dm(wRotinaCarga.substr(2, 2).toLocaleLowerCase(), "", wRotinaCarga.substr(5, wRotinaCarga.length), "", "", 7);
                        wHtml += `
                            <div class="cc-inp cc-col cc-col-${wColspan}" style="background-color:white">
                                <div class="form-group position-relative">
                                    <div>
                                        <label for="data-anResposta">${wScriptItem.anInteracaoTexto}<small>${wScriptItem.anInstrucoes}</small></label>
                                        <select name="data-anResposta" data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">${wMDominioItens}</select>
                                    </div>
                                </div>
                            </div>                            
                        `;
                    }
                    break

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
                                            class="form-check-input" type="radio" name="data-anResposta" id="flexRadioDefault2" value="${wMOptions[wIdx]}"/>
                                            <label  class="form-check-label" for="data-anResposta">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                        </div>
                                    </div>
                                </div>  
                            `;
                            
                        }
                    }
                    break

                case 11:
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
                                                class="form-check-input" type="checkbox" name="data-anResposta" id="${wMOptions[wIdx]}" />
                                                <label  class="form-check-label" for="data-anResposta">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                        </div>
                                    </div>
                                    `;
                        }
                        wHtml += `</div>`
                    }
                    break

                default:
                    break
            }
            return wHtml
        },

        buttonAnterior: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            var wHtmlAnterior = `<div class="cc-btn-col cc-col cc-col-3">
                                    <button data-script-btn-anterior='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}' data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                        <i class="fas fa-arrow-left"></i>
                                        Anterior
                                    </button>
                                </div>
                                `
            return wHtmlAnterior
        },

        buttonProximo: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            wHtmlProximo = `<div class="cc-btn-col cc-col cc-col-3">
                                <button data-script-btn-proximo='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}' data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                    <i class="fas fa-arrow-right"></i>
                                    Próximo
                                </button>
                            </div>
                            `;
            return wHtmlProximo
        },

        htmlButtons: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            var wHtmlButtons = (pItem == 0) ? await _ccSyscare2.monta.buttonProximo(pItem) : (regulacaoScript[pItem].boScriptFim == 1) ? await _ccSyscare2.monta.buttonAnterior(pItem) : await _ccSyscare2.monta.buttonAnterior(pItem) + await _ccSyscare2.monta.buttonProximo(pItem)
            $("[name='data-buttons-script']").html(`
                <div class="cc-col w-100" style="background-color:white">
                    <div class="cc-inp cc-col cc-col-16 cc-row" data-interacao-tp="1" style="float:left">
                        <label for="data-anObservacao"><strong>OBSERVAÇÃO</strong></label>
                        <textarea value="" maxlength="5000" name="data-anObservacao" data-script-omt='${wScriptItem.cnRegulacaoScript}'  
                        data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' data-interacao-tp="1" class="form-control" placeholder="" style="height: 70px"></textarea>
                    </div>
                    <div data-obj-seq="100" class="cc-row" style="border-color: rgb(0 0 0 / 40%)" id="data-buttons-principal">
                        ${wHtmlButtons}
                    </div>
                    <div class="cc-btn-col cc-col cc-col-4 mr-3" style="float: right; ">
                        <button data-script-btn-finalizar='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}' data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block cc-bg-verde cc-text-branco m-3 cc-bg-preto cc-text-branco m-3" >
                            FINALIZAR
                        </button>
                    </div>
                </div>
            `)
        },

        montaJson: async function (pScriptCodigo, pScriptItem, pInteracao) {
            var wScriptCodigo = parseInt(pScriptCodigo)
            var wScriptItem = parseInt(pScriptItem)
            var wValorInteracao = pInteracao

            var wValorObservacao = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}'][name='data-anObservacao']`).val()

            wJson = {
                cnRegulacao: $("[name='cnRegulacao']").val(),
                csRegulacaoMov: "",
                dmSHCRegulacaoSTS: $("[name='dmSHCRegulacaoSTS']").val(),
                dtInicio: "",
                dtFinal: "",
                qtMin: '', // dtFinal - dtInicio
                cnRegulacaoScript: "" + wScriptCodigo + "",
                csRegulacaoScriptItem: "" + wScriptItem + "",
                cnProfissional: $("[name='cnProfissional']").val(), //Profissional que está fazendo as perguntas?
                anPergunta: $(`[for='${wScriptCodigo}-${wScriptItem}']`).text(),
                dtPergunta: "", //momento em que a pergunta foi aberta
                anRespondedor: $("[name='anRespondedor']").val(),
                dtResposta: "", //momento em que a pergunta foi respondida ou momento em que foi clicado em 'proximo'?
                anResposta: _cc.string.valor(wValorInteracao),
                anOBS: wValorObservacao,
            };

            //console.log(wJson);
            wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""] = wJson
            wVetor.push(wJson)
        }
    }

    this.listen = {
        clickScript: async function () {
            $(document).off(cc.evento.click, "[data-btn-script='true']")
            $(document).on(cc.evento.click, "[data-btn-script='true']", async function () {
                await _ccSyscare2.busca.buscaRegulacaoScriptItens($(this).attr("data-script"))
            })
        },

        clickAnterior: async function () {
            $(document).off(cc.evento.click, "[data-script-btn-anterior='true']")
            $(document).on(cc.evento.click, "[data-script-btn-anterior='true']", function () {
                _ccSyscare2.tempo()
                // var wScriptCodigo = $(this).attr("data-script-btn-omt")
                try {
                    wVetor.pop()
                    console.log(wVetor);
                    var wIdxScriptItem = $(this).attr("data-script-btn-omt-index") - 1;
                    _ccSyscare2.cria(wIdxScriptItem, "desc")
                } catch (error) {
                    console.error(error);
                }
            })
        },

        clickProximo: async function () {
            $(document).off(cc.evento.click, "[data-script-btn-proximo='true']")
            $(document).on(cc.evento.click, "[data-script-btn-proximo='true']", async function () {
                var wIdxScriptItem = $(this).attr("data-script-btn-omt-index")
                var wScriptItem = $(this).attr("data-script-btn-omt-item")
                var wScriptCodigo = $(this).attr("data-script-btn-omt")
                debugger
                var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}']`)
                var wValorInteracao = ""
                switch (parseInt(wInteracaoHtm.attr("data-interacao-tp"))) {
                    case 1: // TEXTO
                        wValorInteracao = wInteracaoHtm.val()
                        break

                    case 10: // RADIO
                        wValorInteracao = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}'][name='data-anResposta']:checked`).val()                                                                     
                        if (!wValorInteracao) wValorInteracao = ""                            
                        break

                    case 11: // CHECKBOX
                        var wValorInteracao = {};
                        var wValorChecado = $("[id='container-inputs'] [data-interacao-tp='11']")                        
                        wValorChecado.each(function (index, element) {
                            let wHtmItemScript = $(this);                        
                            wHtmItemScript.is(':checked') ? wValorInteracao["" + wHtmItemScript.attr("id") + ""] = 1 : false
                        });  
                        // console.log(wValorInteracao);
                        if (!(wValorInteracao == {} || "")) wValorInteracao = JSON.stringify(wValorInteracao)
                        //if (wValorInteracao != "") wValorInteracao = JSON.stringify(wValorInteracao)
                        break

                    default:
                        break
                }
                debugger
                if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
                    if (await _ccSyscare2.valida(wValorInteracao) == false) {
                        return
                    }
                }                
                if(wValorInteracao != "") await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)
                console.log("TEM QUE MONTAR O VETOR BRO", wVetor);
                _ccSyscare2.cria(parseInt(++wIdxScriptItem))
            })
        },

        clickFinalizar: async function () {

            let wSaveUrl = cc.url.ccasegd_token + "tabela=shcregulacaomov";
            let wSaveMthd = "post";

            $(document).off(cc.evento.click, "[data-script-btn-finalizar='true']")
            $(document).on(cc.evento.click, "[data-script-btn-finalizar='true']", async function () {
                var wScriptItem = $(this).attr("data-script-btn-omt-item")
                var wScriptCodigo = $(this).attr("data-script-btn-omt")                
                var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}'][name='data-anResposta']`)
                var wValorInteracao = ""
                switch (parseInt(wInteracaoHtm.attr("data-interacao-tp"))) {
                    case 1: // TEXTO
                        wValorInteracao = wInteracaoHtm.val()
                        break

                    case 10: // RADIO
                        wValorInteracao = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}'][name='data-anResposta']:checked`).val()
                        if (!wValorInteracao) wValorInteracao = ""
                        break
                    
                    case 11: // CHECKBOX
                        debugger
                        var wValorInteracao = {};
                        var wValorChecado = $("[id='container-inputs'] [data-interacao-tp='11']")
                        wValorChecado.each(function (index, element) {
                            let wHtmItemScript = $(this);
                            wHtmItemScript.is(':checked') ? wValorInteracao["" + wHtmItemScript.attr("id") + ""] = 1 : false
                        });
                        wValorInteracao = JSON.stringify(wValorInteracao)
                        break

                    default:
                        break
                }
                /** SE A INTERAÇÃO FOR REQUERIDA, ENTRA NA FUNÇÃO DE VALIDAÇÃO */
                if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
                    if (await _ccSyscare2.valida(wValorInteracao) == false) {
                        return
                    }
                }
                        
                if(wValorInteracao) await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)                
                for (let wIdx = 0; wIdx < wVetor.length; wIdx++) {
                    await _cc.ajax(wSaveUrl, wSaveMthd, "application/json", JSON.stringify(wVetor[wIdx]), "", "").then((result) => {
                        console.log("DATA RESULT: ", result)
                        if (result.cnRetorno != 0) {
                            _cc.msg("Erro ao salvar!", "danger")
                        } else {
                            _cc.msg("Registro salvo com sucesso!", "success")
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                console.log("VETOR", wVetor);                
                await _ccSyscare2.limpaInputs()
                wVetor = []
                wJsonScriptRegulacao["" + wScriptCodigo + ""] = {}
                _ccSyscare2.cria(0, null, "limpa")
            })
        }
    }

    this.inicia = async function (pObjReferencia) {
        await _ccSyscare2.monta.htmlCabecalho(cLower(pObjReferencia))
        await _ccSyscare2.listen.clickScript()
    }

    this.cria = async function (pItem, pBoDesc, pBoLimpa) {
        _ccSyscare2.listen.clickProximo()
        _ccSyscare2.listen.clickAnterior()
        _ccSyscare2.listen.clickFinalizar()

        var wScriptItem = regulacaoScript[pItem]
        pItem > 0 && $("[name='anRespondedor']").val() ? $("[name='anRespondedor']").attr("readonly", true) : $("[name='anRespondedor']").attr("readonly", false)


        if (wScriptItem.anInteracaoCondicional) {
            // console.log("INTERAÇÃO ---> ", wScriptItem.anInteracaoCondicional);
            var wClausula = await _ccSyscare2.condiciona(wScriptItem.cnRegulacaoScript, wScriptItem.anInteracaoCondicional)
            if (!eval(wClausula)) {
                if (regulacaoScript.length == wScriptItem + 1) {
                    $("[name='data-buttons-script']").html('<div ><button type="button"  onclick="alert(\'Fim\')" class="cc-btn btn btn-block  cc-bg-verde cc-text-branco cc-bg-preto cc-text-branco m-3 ">FINALIZAR</button></div>')
                    return
                } else {
                    /* REMOVE RESPOSTA SALVA */
                    delete wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]                    
                    /** TERNÁRIO */
                    pBoDesc && pBoDesc != '' ? _ccSyscare2.cria(pItem - 1) : _ccSyscare2.cria(pItem + 1);
                    return
                }
            }
        }

        var wHtmScriptItem = await _ccSyscare2.monta.htmlInput(pItem)
        /** Apepnd HTML */
        $("[name='data-conteudo-script']").html(wHtmScriptItem)
        /** MONTA BOTÕES */
        await _ccSyscare2.monta.htmlButtons(pItem)
        await _ccSyscare2.tempo()
        
        var wScriptRegulacao = wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""];
        if (wScriptRegulacao && !pBoLimpa) {
            var wInteracaoValor = wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]["anResposta"]
            debugger
            var wObservacaoValor = wScriptRegulacao["anOBS"]
            /** SE JÁ TIVER VALOR SALVO */
            if (wInteracaoValor) {
                var wInteracaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='data-anResposta']`);
                switch (wInteracaoHtm.attr("data-interacao-tp")) {
                    case '1':
                        wInteracaoHtm.val(wInteracaoValor);
                        break;

                    case '10':
                        $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][value='${wInteracaoValor}']`).attr('checked', true);
                        break;

                    case '11':
                        var wInteracaoCheckbox = JSON.parse(wInteracaoValor)
                        var wMCheckbox = Object.getOwnPropertyNames(wInteracaoCheckbox);
                        wMCheckbox.forEach(element => {
                            $(`[data-script-omt-item][id=${element}]`).prop('checked', true)
                        });
                        break;

                    default:
                        break;
                }
            }
            console.log('vamo ver se entra');
            if (wObservacaoValor) {
                var wObservacaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='data-anObservacao']`);
                wObservacaoHtm.val(wObservacaoValor);
            }
        }
        wQtdMinutosInicio = moment().format('DD/MM/YYYY HH:mm:ss');
    }
}

var _ccSyscare2 = new _ccSyscareScript()
_ccSyscare2.inicia('frmshc.paginaprincipal')