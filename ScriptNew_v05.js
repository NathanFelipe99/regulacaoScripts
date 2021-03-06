var _ccSyscareScript = function () {
    window.wJsonScriptRegulacao = {}
    var wJson = {}
    var wVetor = []
    var wStartTimeSec = ""
    var wEndTimeSec = ""
    var wMItensCriados = []
    window.regulacaoScript = {}
    var wJsonSalvo = {}
    var wContadorAtendimento, wContadorPergunta
    var wAtendimentoTimer = moment("00:00:00", "HH:mm:ss")
    var wPerguntaTimer = moment("00:00:00", "HH:mm:ss")
    /* RICHARD */
    var wScriptCodigoRegulacao = 0    

    this.limpa = {
        limpaInputs: async function () {
            for (var wIdx = 0; wIdx < wVetor.length; wIdx++) {
                $('[id="fme-scripts"]').find('input').val('')
                $('[id="fme-scripts"] [type="radio"]').prop('checked', false)
                $('[id="fme-scripts"] [type="checkbox"]').prop('checked', false)
                $('[id="fme-scripts"] [type="text"]').val('')
            }
            $('[id="mnu-scripts"]').find('button').css('background-color', '#585858', 'color', '#FFFFFF')
            $('[id="fme-timer-scripts"]').text('')
            wAtendimentoTimer = moment("00:00:00", "HH:mm:ss");
            $('[id="fme-scripts-pergunta-timer"]').text('')
            $('[id="mnu-dados-regulacao-itens"]').empty()               
            $('[name="data-anRespondedor"]').val('')
            $('[id="container-btn-cancelar"]').attr('hidden', true)
            $('[id="container-btn-finalizar"]').attr('hidden', true)
            $('[id="container-btn-iniciar"]').attr('hidden', false)
        },

        limpaVetores: async function (pScriptCodigo) {
            var wScriptCodigo = pScriptCodigo
            wVetor = []
            wJsonScriptRegulacao["" + wScriptCodigo + ""] = {}
            wJsonSalvo = {}
            wMItensCriados = []
        }
    },

    this.timer = {
        iniciaAtendimento: async function () {
            var wDomTime = $("[id='fme-timer-scripts']")
            wContadorAtendimento = setInterval(function () {
                wAtendimentoTimer = wAtendimentoTimer.add(1, 'seconds')                
                wDomTime.html("TEMPO DO ATENDIMENTO: " + wAtendimentoTimer.format("HH:mm:ss"))
            }, 1000)
        },

        iniciaPergunta: async function () {
            $("[id='fme-scripts-pergunta-timer']").html("TEMPO DA PERGUNTA: " + wPerguntaTimer.format("HH:mm:ss") || "00:00:00")
            var wDomTime = $("[id='fme-scripts-pergunta-timer']")
            wContadorPergunta = setInterval(function () {
                wPerguntaTimer = wPerguntaTimer.add(1, 'seconds')                
                wDomTime.html("TEMPO DA PERGUNTA: " + wPerguntaTimer.format("HH:mm:ss"))
            }, 1000)
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

    this.direciona = async function (pScriptItem, pCondicional) {
        if (pCondicional) {
            var wScripItem = parseInt(pScriptItem)
            var wDirecional = regulacaoScript[wScriptCodigoRegulacao][wScripItem].anDirecionamentoCondicional
            var wClausula = wDirecional.split("==")
            // var wScripItem = wClausula[0]
            var wInteracao = wClausula[1].replace(/'/g, "")

            if (wInteracao == pCondicional) return true
        }
    }

    this.valida = async function (pInteracao) {
        // VERIFICA SE ?? VAZIA OU SE ?? UM OBJETO VAZIO
        if (pInteracao == "" || (typeof (pInteracao) == 'object' && Object.getOwnPropertyNames(pInteracao).length == 0)) {
            alertify.set('notifier', 'position', 'top-right')
            alertify.error("<p class='text-center' style='color:white;font-size:16px;'>Resposta da pergunta ?? requerida!</p>", 20, alertify.get('notifier', 'position'))
            return false
        }
    }

    this.changeColor = async function (pCodigo) {
        var wScripts = $('[data-btn-script="true"]')
        wScripts.each(function () {
            if ($(this).attr("data-script") == parseInt(pCodigo)) {
                $(this).removeClass('cc-btn-cinza-escuro').addClass('cc-btn-cinza')
                $(this).css('font-weight', 'bold')
            } else {
                $(this).removeClass('cc-btn-cinza').addClass('cc-btn-cinza-escuro')
            }
        })
    }

    this.busca = {
        buscaRegulacaoScript: async function () {
            var wTabela = "shcregulacaoscript"
            var wJsn = `{
                obj:  '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabela + "&colunas=cnRegulacaoScript,nmRegulacaoScript,dsRegulacaoScript,anRegulacaoTema" + "&where=boInativo=0"), +1, 10, 0, 0, 1)}'
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
            var wWhere = `cnRegulacaoScript=${pScript} AND boInativo=0`
            var wJsnItens = `{
                obj: '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabela + "&colunas=" + wColunas + "&orderby=" + wOrderBy + "&where=" + wWhere), +1, 10, 0, 0, 1)}'
            }`
            wJsonScriptRegulacao["" + pScript + ""] = (wJsonScriptRegulacao["" + pScript + ""]) ? (wJsonScriptRegulacao["" + pScript + ""]) : {}
            console.log("?? CONSULTA, FA??A O AJAX FILH??O");
            var wAjax = await _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsnItens)
            return $.when(wAjax).then(
                async function (jsonScriptItem) {
                    /* VALIDA DATARESUL */
                    _cc.validaResultadoAjax(jsonScriptItem)
                    var wData = jsonScriptItem.data
                    wHtml = `
                        <div>                               
                            <div class="mx-4 px-2" name="data-conteudo-script">
                            </div>
                            <div class="mx-4" name="data-buttons-script" >
                            </div>
                        </div>
                        `
                    $("[name='fme-scripts']").html(wHtml)
                    regulacaoScript[pScript] = wData;
                    wScriptItem ? await _ccSyscare2.cria(pScript, wScriptItem) : await _ccSyscare2.cria(pScript, 0)                    
                })
        }
    }

    this.monta = {
        htmlCabecalho: async function (pObjReferencia) {
            $("[name='" + pObjReferencia + "']").html(`
                <div style="max-width: 800px;margin: auto;background-color:white;display: grid; " class="container-inputs" id="container-inputs">
                    <div id="mnu-dados-regulacao" name="mnu-dados-regulacao" style="display: grid; grid-template-columns: repeat(auto-fill, 186px); background-color:white; justify-content:center">
                        <div class="m-4">
                                <label for="cnRegulacao"><strong>C??digo da Regula????o</strong></label>
                                <input value="" maxlength="50" name="cnRegulacao" data-interacao-tp="1" class="form-control cc-col-4" placeholder="">
                        </div>
                        <div class="m-4">
                                <label for="data-anRespondedor"><strong>Respondedor</strong></label>
                                <input value="" maxlength="50" name="data-anRespondedor" data-interacao-tp="1" class="form-control cc-col-4" placeholder="">
                        </div>
                        <div class="m-4">
                            <label for="dmSHCRegulacaoSTS"><strong>Status da Regula????o</strong></label>
                            <input value="" maxlength="50" name="dmSHCRegulacaoSTS" data-interacao-tp="1" class="form-control cc-col-4" placeholder="">
                        </div>
                        <div class="m-4">
                            <label for="cnProfissional"><strong>C??digo do Profissional</strong></label>
                            <input value="${window.cc.global.cnProfissional}" maxlength="50" name="cnProfissional" data-interacao-tp="1" class="form-control cc-col-4" placeholder="" readonly>
                        </div>
                    </div>
                    <div id="mnu-dados-regulacao-itens" name="mnu-dados-regulacao-itens" style="display:block;background-color:white; padding:0.2rem">
                    </div>                    
                    <div name="fme-buttons-control" id="fme-buttons-control" class="mb-3 ml-2" style="background-color:white;display:flex; flex-direction:row;justify-content: space-between">
                        <div class="cc-btn-col cc-col cc-col-4 pl-3" id="container-btn-iniciar">
                            <button data-script-btn-iniciar='true' class="cc-btn btn btn-block cc-bg-azul cc-text-branco" style="width: 20rem;font-weight: bold;">
                                <i class="fas fa-play mr-2"></i> INICIAR
                            </button>
                        </div>
                        <div class="cc-btn-col cc-col cc-col-4 ml-2" id="container-btn-cancelar" hidden="true">
                            <button data-script-btn-cancelar='true' class="cc-btn btn btn-block cc-bg-vermelho cc-text-branco mt-3 pl-3" style="width: 20rem;font-weight: bold;">
                                <i class="fas fa-ban mr-2"></i> CANCELAR
                            </button>
                        </div>
                        <div class="cc-btn-col cc-col cc-col-4 mr-2" style="float: right; align-self:flex-end; margin-right:1.5rem !important" id="container-btn-finalizar" hidden="true">
                            <button data-script-btn-finalizar='true' class="cc-btn btn btn-block cc-bg-verde cc-text-branco mt-3 pl-3" style="width: 20rem;font-weight: bold;">
                                <i class="fas fa-check mr-2"></i> FINALIZAR
                            </button>
                        </div>       
                    </div>
                </div>                
            `)
            
            await _ccSyscare2.listen.clickIniciar(pObjReferencia)
            await _ccSyscare2.listen.clickCancelar()
        },

        htmlScripts: async function () {
            $('[id="container-btn-iniciar"]').attr('hidden', true)
            $('[id="container-btn-cancelar"]').attr('hidden', false)
            $('[id="container-btn-finalizar"]').attr('hidden', false)
            var wData = await _ccSyscare2.busca.buscaRegulacaoScript()
            var wHtml = ""
            for (var wIdx = 0; wIdx < wData.length; wIdx++) {
                const wScript = wData[wIdx]
                wHtml += `<button style="font-weight: bold position:relative;" data-btn-script='true' class="mx-2 my-2 btn cc-btn-cinza-escuro cc-text-branco" type="button" data-script="${wScript.cnRegulacaoScript}" >${wScript.nmRegulacaoScript}</button>`
            }
            $("[id='mnu-dados-regulacao-itens']").html(`                    
                    <div name="mnu-scripts" id="mnu-scripts" style="display:block">${wHtml}</div>
                    <div name="fme-timer-scripts" id="fme-timer-scripts" style="font-size:16px;text-align: center;font-weight: bold;" class="my-3"></div>
                    <hr style="background-color:white">
                    <div name="fme-scripts" id="fme-scripts" style="background-color:white"></div>                                            
                    <div name="fme-scripts-pergunta-timer" id="fme-scripts-pergunta-timer" style="background-color:white;font-size:12px;text-align: center;font-weight: bold; float:left; padding-right: 3.3rem; margin-left:2rem" class="my-3"></div>
            `)
            await _ccSyscare2.listen.clickScript()
            await _ccSyscare2.timer.iniciaAtendimento()
        },

        htmlInput: async function (pScriptItem) {
            var wScriptItem = regulacaoScript[wScriptCodigoRegulacao][parseInt(pScriptItem)]
            var wRotinaCarga = wScriptItem.qtInteracaoOpcao
            var wColspan = wScriptItem.qtInteracaoColspan || 8
            var wMaxLen = wScriptItem.qtInteracaoTamanho || 50

            var wHtml = ""
            switch (wScriptItem.cnInteracaoTP) {
                case 1: // TEXTOS
                    wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 0.75rem;border-radius: 5px;" name="data-anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                    wHtml += `
                        <div class="cc-inp cc-col cc-col-${wColspan}" style="background-color:white">
                            <div class="form-group position-relative">
                                <div>                                    
                                    <input value='' name='data-anResposta' maxlength='${wMaxLen}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-requerido='${wScriptItem.boRequerido}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="form-control" placeholder="">
                                </div>
                            </div>
                        </div>

                    `
                    $('[data-script-omt="' + wScriptItem.cnRegulacaoScript + '"]').val('')
                    break

                case 7:
                    if (wRotinaCarga.substr(0, 2).toLocaleLowerCase() == "dm") {
                        /* ROTINA CARGA COMBO */
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="data-anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
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
                        `
                    }
                    break

                case 10: // RADIO
                    if (wRotinaCarga.indexOf("{") >= 0) {
                        wRotinaCarga = JSON.parse(wRotinaCarga)
                        wMOptions = Object.getOwnPropertyNames(wRotinaCarga)
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="data-anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>`;
                        for (let wIdx = 0; wIdx < wMOptions.length; wIdx++) {
                            wHtml += `
                                <div class="cc-inp  cc-col cc-col-${wColspan}" style="background-color:white">
                                    <div class="form-group position-relative">
                                        <div class="form-check">
                                            <input data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' 
                                            data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' 
                                            class="form-check-input" type="radio" name="data-anResposta" id="flexRadioDefault2" value="${wMOptions[wIdx]}"/>
                                            <label  class="form-check-label ml-2" for="data-anResposta">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                        </div>
                                    </div>
                                </div>  
                            `
                        }
                    }
                    break

                case 11:
                    if (wRotinaCarga.indexOf("{") >= 0) {
                        wRotinaCarga = JSON.parse(wRotinaCarga)
                        wMOptions = Object.getOwnPropertyNames(wRotinaCarga)
                        wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="data-anPergunta" for="${wScriptItem.cnRegulacaoScript}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto} ${wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""}</h4>
                                <div id='container-inputs'> `
                        for (let wIdx = 0; wIdx < wMOptions.length; wIdx++) {
                            wHtml += `
                                    <div class="cc-inp cc-col cc-col-${wColspan}" style="background-color:white">
                                        <div class="form-group position-relative">
                                            <input data-interacao-requerido='${wScriptItem.boRequerido}' data-script-omt='${wScriptItem.cnRegulacaoScript}' data-interacao-tp='${wScriptItem.cnInteracaoTP}' 
                                                data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' 
                                                class="form-check-input" type="checkbox" name="data-anResposta" id="${wMOptions[wIdx]}" />
                                                <label  class="form-check-label ml-2" for="data-anResposta">${wRotinaCarga[wMOptions[wIdx]]}</label>
                                        </div>
                                    </div>
                                    `
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
            var wScriptItem = regulacaoScript[wScriptCodigoRegulacao][pItem]
            var wHtmlAnterior = `<div class="cc-btn-col cc-col cc-col-3 mr-3">
                                    <button style="font-weight: bold" data-script-btn-anterior='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}' data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block cc-bg-preto cc-text-branco mt-3 cc-bg-preto">
                                        <i class="fas fa-arrow-left"></i>
                                        Anterior
                                    </button>
                                </div>
                                `
            return wHtmlAnterior
        },

        buttonProximo: async function (pItem) {
            var wScriptItem = regulacaoScript[wScriptCodigoRegulacao][pItem]
            wHtmlProximo = `<div class="cc-btn-col cc-col cc-col-3 mr-3">
                                <button style="font-weight: bold" data-script-btn-proximo='true' data-script-btn-omt='${wScriptItem.cnRegulacaoScript}' data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' class="cc-btn btn btn-block cc-bg-preto cc-text-branco mt-3 cc-bg-preto">
                                    <i class="fas fa-arrow-right"></i>
                                    Pr??ximo
                                </button>
                            </div>
                            `
            return wHtmlProximo
        },

        htmlButtons: async function (pItem) {
            var wScriptItem = regulacaoScript[wScriptCodigoRegulacao][pItem]
            var wHtmlButtons = (pItem == 0) ? await _ccSyscare2.monta.buttonProximo(pItem) : (regulacaoScript[wScriptCodigoRegulacao][pItem].boScriptFim == 1) ? await _ccSyscare2.monta.buttonAnterior(pItem) : await _ccSyscare2.monta.buttonAnterior(pItem) + await _ccSyscare2.monta.buttonProximo(pItem)
            $("[name='data-buttons-script']").html(`
                <div class="cc-col w-100" style="background-color:white">
                    <div class="cc-inp cc-col cc-col-16 cc-row" data-interacao-tp="1" style="float:left">
                        <label for="data-anObservacao"><strong>OBSERVA????O</strong></label>
                        <textarea value="" maxlength="4000" name="data-anObservacao" data-script-omt='${wScriptItem.cnRegulacaoScript}'  
                        data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-script-btn-omt-index='${pItem}' data-interacao-tp="1" class="form-control" placeholder="" style="height: 120px"></textarea>
                        <small style="font-weight:bold;font-size:15px !important">Instru????o: ${wScriptItem.anInstrucoes}</small>
                    </div>
                    <div data-obj-seq="100" class="cc-row" style="border-color: rgb(0 0 0 / 40%)" id="data-buttons-principal">
                        ${wHtmlButtons}
                    </div>                    
                </div>
            `)
        },

        montaJson: async function (pScriptCodigo, pScriptItem, pInteracao) {
            var wScriptCodigo = parseInt(pScriptCodigo)
            var wScriptItem = parseInt(pScriptItem)
            var wValorInteracao = pInteracao
            var wValorObservacao = $("[name='data-anObservacao']").val()
            wEndTimeSec = moment().format("DD/MM/YYYY HH:mm:ss")
            var wDiff = _ccDate.Diff(wStartTimeSec, wEndTimeSec, cc.global.datetime_format, "second")
            wJson = {
                cnRegulacao: $("[name='cnRegulacao']").val(),
                csRegulacaoMov: "",
                dmSHCRegulacaoSTS: $("[name='dmSHCRegulacaoSTS']").val(),
                qtSegundos: "" + wDiff + "",
                cnRegulacaoScript: "" + wScriptCodigo + "",
                csRegulacaoScriptItem: "" + wScriptItem + "",
                cnProfissional: $("[name='cnProfissional']").val(),
                anPergunta: $(`[for='${wScriptCodigo}-${wScriptItem}']`).text(),
                dtPergunta: "" + wStartTimeSec + "",
                anRespondedor: $("[name='data-anRespondedor']").val(),
                dtResposta: "" + wEndTimeSec + "",
                anResposta: _cc.string.valor(wValorInteracao),
                anOBS: wValorObservacao,
                boSubstituido: "" + 0 + ""
            };
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
            $(document).on(cc.evento.click, "[data-script-btn-anterior='true']", async function () {
                try {
                    // console.log("ITENS CRIADOS ", wMItensCriados);
                    var wUltimoCodigo = wMItensCriados[wMItensCriados.length - 1][0] // CODIGO
                    var wUltimoCodigoItem = wMItensCriados[wMItensCriados.length - 1][1] // ITEM                    
                    wObjPesquisa = wUltimoCodigoItem
                    wPos = null
                    for (wIdx = 0; wIdx < regulacaoScript[wUltimoCodigo].length; wIdx++) {
                        if (wObjPesquisa == regulacaoScript[wUltimoCodigo][wIdx].csRegulacaoScriptItem) {
                            wPos = wIdx
                            break
                        }
                    }
                    // _ccSyscare2.cria(wUltimoCodigo, wMItensCriados.length - 1, "desc") // -> RICHARD
                    wMItensCriados.pop()
                    await _ccSyscare2.cria(wUltimoCodigo, wPos, "desc")
                                    
                } catch (error) {
                    console.error(error)
                }
            })
        },

        clickProximo: async function () {
            $(document).off(cc.evento.click, "[data-script-btn-proximo='true']")
            $(document).on(cc.evento.click, "[data-script-btn-proximo='true']", async function () {
                var wIdxScriptItem = $(this).attr("data-script-btn-omt-index")
                var wScriptItem = $(this).attr("data-script-btn-omt-item")
                var wScriptCodigo = $(this).attr("data-script-btn-omt")
                var regulacaoScriptItem = regulacaoScript[wScriptCodigoRegulacao][wIdxScriptItem]
                var wDirecionamentoCondicional = regulacaoScriptItem.anDirecionamentoCondicional
                var wDirecionamentoCodigo = regulacaoScriptItem.cnDirecionamentoScript
                var wDirecionamentoIndex = regulacaoScriptItem.cnDirecionamentoScriptItem - 1
                var wValorObservacao = $("[name='data-anObservacao']").val()
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
                            let wHtmItemScript = $(this)
                            wHtmItemScript.is(':checked') ? wValorInteracao["" + wHtmItemScript.attr("id") + ""] = 1 : false
                        })
                        Object.getOwnPropertyNames(wValorInteracao).length > 0 ? wValorInteracao : wValorInteracao = ""
                        break

                    default:
                        break
                }
                if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
                    if (await _ccSyscare2.valida(wValorInteracao) == false) {
                        return
                    }
                }
                // SE FOR OBJETO, FAZ O STRINGIFY AP??S A VALIDA????O DA INTERA????O                
                if (typeof (wValorInteracao) == 'object') wValorInteracao = JSON.stringify(wValorInteracao)

                wJsonSalvo = wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""]

                /** VERIFICA SE O ITEM J?? FOI PREENCHIDO E FAZ A TRATATIVA DEVIDA */
                if (wJsonSalvo) {
                    // console.log("wJsonSalvo", wJsonSalvo);
                    var wItemJaExiste = (wJsonSalvo.cnRegulacaoScript == wScriptCodigo) && (wJsonSalvo.csRegulacaoScriptItem == wScriptItem) ? true : false
                    if (wItemJaExiste) {
                        if ((wValorInteracao !== "") && (wValorInteracao !== wJsonSalvo.anResposta || wValorObservacao !== wJsonSalvo.anOBS)) {
                            var wSubstituido = wVetor.findIndex((script => script.cnRegulacaoScript == wScriptCodigo) && (item => (item.csRegulacaoScriptItem == wScriptItem) && (item.boSubstituido == "0")))
                            wVetor[wSubstituido].boSubstituido = "1"
                            await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)
                        }
                    } else {
                        if (wValorInteracao != "") await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)
                    }
                } else {
                    if (wValorInteracao != "") {
                        await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)
                    }
                }
                if (wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""]) wJsonScriptRegulacao["" + wScriptCodigo + ""]["" + wScriptItem + ""].duracaoTemp = wPerguntaTimer.format("HH:mm:ss")
                console.log("ADICIONOU AO VETOR", wVetor)
                wMItensCriados.push([wScriptCodigo, wScriptItem])
                clearInterval(wContadorPergunta)
                wPerguntaTimer = moment("00:00:00", "HH:mm:ss")
                
                if (wDirecionamentoCondicional != "") {
                    var wRetornoDireciona = await _ccSyscare2.direciona(wIdxScriptItem, wValorInteracao)
                    if (wRetornoDireciona == true) {                           
                        await _ccSyscare2.busca.buscaRegulacaoScriptItens(wDirecionamentoCodigo, wDirecionamentoIndex)
                        var wScriptDireciona = $(`[data-btn-script='true'][data-script='${wDirecionamentoCodigo}']`).text()
                        _cc.msg(`Direcionando para o Script ${wScriptDireciona}`, "warning2", 3)                        
                    } else {
                        await _ccSyscare2.cria(wScriptCodigoRegulacao, parseInt(++wIdxScriptItem))
                    }
                } else {
                    await _ccSyscare2.cria(wScriptCodigoRegulacao, parseInt(++wIdxScriptItem))
                }
            })
        },

        clickFinalizar: async function () {
            let wSaveUrl = cc.url.ccasegd_token + "tabela=shcregulacaomov"
            let wSaveMthd = "post"
            $(document).off(cc.evento.click, "[data-script-btn-finalizar='true']")
            $(document).on(cc.evento.click, "[data-script-btn-finalizar='true']", async function () {
                var wScriptCodigo = $(`[name='data-anResposta']`).attr("data-script-omt")
                var wScriptItem = $(`[name='data-anResposta']`).attr("data-script-omt-item")
                var wInteracaoHtm = $(`[data-script-omt='${wScriptCodigo}'][data-script-omt-item='${wScriptItem}'][name='data-anResposta']`)
                var wValorObservacao = $("[name='data-anObservacao']").val()
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
                        })
                        Object.getOwnPropertyNames(wValorInteracao).length > 0 ? wValorInteracao : wValorInteracao = ""
                        break

                    default:
                        break
                }
                // VERIIFICA SE A INTERA????O ?? REQUERIDA E N??O ?? VAZIA (STRING OU OBJECT)
                if (wInteracaoHtm.attr("data-interacao-requerido") != "0") {
                    if (await _ccSyscare2.valida(wValorInteracao) == false) return
                }
                // VERIFICA SE A INTERA????O ?? OBJETO SOMENTE AP??S PASSAR PELA VALIDA????O --> NATHAN 
                if (typeof (wValorInteracao) == 'object') wValorInteracao = JSON.stringify(wValorInteracao)

                wMItensCriados.push([wScriptCodigo, wScriptItem])

                var wUltimoCodigo = wMItensCriados[wMItensCriados.length - 1][0]
                var wUltimoCodigoItem = wMItensCriados[wMItensCriados.length - 1][1]

                var wCodigoCriado = wVetor.findIndex((script => script.cnRegulacaoScript == wUltimoCodigo) && (item => item.csRegulacaoScriptItem == wUltimoCodigoItem && item.boSubstituido == "0"))
                if (wCodigoCriado != -1 && wValorInteracao != "") {
                    if (wVetor[wCodigoCriado].anResposta != wValorInteracao || wVetor[wCodigoCriado].anOBS != wValorObservacao) {
                        await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)
                        wVetor[wCodigoCriado].boSubstituido = "1"
                    }
                } else {
                    if (wValorInteracao != "") await _ccSyscare2.monta.montaJson(wScriptCodigo, wScriptItem, wValorInteracao)
                }
                for (let wIdx = 0; wIdx < wVetor.length; wIdx++) {
                    delete wVetor[wIdx].duracaoTemp
                    await _cc.ajax(wSaveUrl, wSaveMthd, "application/json", JSON.stringify(wVetor[wIdx]), "", "").then((result) => {
                        if (result.cnRetorno != 0) {                            
                            _cc.msg(`Erro ao salvar: ${result.anMensagem}!`, "danger")
                        } else {
                            _cc.msg("Registro salvo com sucesso!", "success")
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
                console.log("VETOR", wVetor)
                clearInterval(wContadorAtendimento)
                clearInterval(wContadorPergunta)            
                await _ccSyscare2.limpa.limpaInputs()
                await _ccSyscare2.limpa.limpaVetores(wScriptCodigo)
            })
        },

        clickIniciar: async function (pObjReferencia) {
            $(document).off(cc.evento.click, "[data-script-btn-iniciar='true']")
            $(document).on(cc.evento.click, "[data-script-btn-iniciar='true']", async function () {         
                await _ccSyscare2.monta.htmlScripts(cLower(pObjReferencia))            
            })
        },

        clickCancelar: async function () {
            $(document).off(cc.evento.click, "[data-script-btn-cancelar='true']")
            $(document).on(cc.evento.click, "[data-script-btn-cancelar='true']", async function () {
                var wScriptCodigo = $("[data-script-btn-proximo='true']").attr("data-script-btn-omt")                           
                clearInterval(wContadorPergunta)
                clearInterval(wContadorAtendimento)
                await _ccSyscare2.limpa.limpaInputs()
                await _ccSyscare2.limpa.limpaVetores(wScriptCodigo)
                $("[id='container-btn-cancelar']").attr('hidden', true)
                $("[id='container-btn-finalizar']").attr('hidden', true)
                $("[id='container-btn-iniciar']").attr('hidden', false)                
            })
        },
    }

    this.inicia = async function (pObjReferencia) {
        // await _ccSyscare2.monta.htmlScripts(cLower(pObjReferencia))
        await _ccSyscare2.monta.htmlCabecalho(cLower(pObjReferencia))
    }

    this.cria = async function (pScript, pItem, pBoDesc) {
        /** REMOVIDO pBoLimpa --> DESUSO (NATHAN 13/04) */
        _ccSyscare2.listen.clickProximo()
        _ccSyscare2.listen.clickAnterior()        
        _ccSyscare2.listen.clickFinalizar()
        wScriptCodigoRegulacao = pScript
        clearInterval(wContadorPergunta) 
        await _ccSyscare2.changeColor(wScriptCodigoRegulacao)
        _cc.loading.show('Carregando...', 1, 'carregaPergunta')
        
        var wScriptItem = regulacaoScript[pScript][pItem]
        pItem > 0 && $("[name='data-anRespondedor']").val() ? $("[name='data-anRespondedor']").attr("readonly", true) : $("[name='data-anRespondedor']").attr("readonly", false)

        if (wScriptItem.anInteracaoCondicional) {
            var wClausula = await _ccSyscare2.condiciona(wScriptItem.cnRegulacaoScript, wScriptItem.anInteracaoCondicional)
            if (!eval(wClausula)) {
                if (regulacaoScript[pScript].length == wScriptItem.csRegulacaoScriptItem + 1) {
                    $("[data-script-btn-proximo='true']").hide()
                    _cc.msg('Final do Script !', "warning2")
                    return
                } else {
                    /* REMOVE RESPOSTA SALVA */
                    // delete wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]
                    /** TERN??RIO */
                    pBoDesc && pBoDesc != '' ? _ccSyscare2.cria(wScriptCodigoRegulacao, pItem - 1) : _ccSyscare2.cria(wScriptCodigoRegulacao, pItem + 1)
                    return
                }
            }
        }

        var wHtmScriptItem = await _ccSyscare2.monta.htmlInput(pItem)
        /** Append HTML */
        $("[name='data-conteudo-script']").html(wHtmScriptItem)

        wStartTimeSec = moment().format("DD/MM/YYYY HH:mm:ss")

        /** MONTA BOT??ES */
        await _ccSyscare2.monta.htmlButtons(pItem)

        var wScriptRegulacao = wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]

        if (wScriptRegulacao) {
            var wTimeAnt = moment(wScriptRegulacao.duracaoTemp, "HH:mm:ss").format("HH:mm:ss")
            wPerguntaTimer = moment(wTimeAnt, "HH:mm:ss")
            _ccSyscare2.timer.iniciaPergunta()
            var wInteracaoValor = wJsonScriptRegulacao["" + wScriptItem.cnRegulacaoScript + ""]["" + wScriptItem.csRegulacaoScriptItem + ""]["anResposta"]
            var wObservacaoValor = wScriptRegulacao["anOBS"]
            /** SE J?? TIVER VALOR SALVO */
            if (wInteracaoValor) {
                var wInteracaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='data-anResposta']`)
                switch (wInteracaoHtm.attr("data-interacao-tp")) {
                    case '1':
                        wInteracaoHtm.val(wInteracaoValor)
                        break

                    case '10':
                        $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][value='${wInteracaoValor}']`).attr('checked', true)
                        break

                    case '11':
                        var wInteracaoCheckbox = JSON.parse(wInteracaoValor)
                        var wMCheckbox = Object.getOwnPropertyNames(wInteracaoCheckbox)
                        wMCheckbox.forEach(element => {
                            $(`[data-script-omt-item][id=${element}]`).prop('checked', true)
                        });
                        break

                    default:
                        break
                }
            }
            if (wObservacaoValor) {
                var wObservacaoHtm = $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='data-anObservacao']`)
                wObservacaoHtm.val(wObservacaoValor)
            }
        } else {
            wPerguntaTimer = moment("00:00:00", "HH:mm:ss")
            _ccSyscare2.timer.iniciaPergunta()
        }

        _cc.loading.hide('carregaPergunta', 1)
    }
}

var _ccSyscare2 = new _ccSyscareScript()
// _ccSyscare2.inicia('frmshc.paginaprincipal')
// _ccSyscare2.inicia('frmshc.Remocao.Main.Dados.RegMov.Script.CodigoScript')