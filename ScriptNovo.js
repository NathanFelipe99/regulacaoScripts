var _ccSyscareScript = function () {
    window.wJsonScriptRegulacao = {}

    this.limpa = async function (pScriptItem) {
        var wScriptItem = pScriptItem
        for (wScriptItem; wScriptItem > 0; wScriptItem--) {
            $("[name='anRespondedor']").val("")
            $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='anResposta']`).attr("value", "");
            $(`[data-script-omt='${wScriptItem.cnRegulacaoScript}'][data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}'][name='anObservacao']`).attr("value", "");
        }
    }

    this.condiciona = function (pScriptItem, pCondicional) {
        var wScript = parseInt(pScriptItem);
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
            let wMScriptItemCondicional = wJsonScriptRegulacao["" + wScript + ""]["" + wScriptItem + ""] || {}
            wRetornoClausula += ` '${wMScriptItemCondicional["anResposta"]}' ${wOperador} ${wValor2} `;
        }
        return wRetornoClausula;
    }

    this.listen = {
        clickScript: async () => {
            $(document).off(cc.evento.click, "[data-btn-script='true']");
            $(document).on(cc.evento.click, "[data-btn-script='true']", async function () {

                await _ccSyscare1.busca.buscaRegulacaoScriptItens($(this).attr("data-script"))

            });
        },

        clickProximo: async () => {
            $(document).off(cc.evento.click, "[data-script-btn-proximo='true']");
            $(document).on(cc.evento.click, "[data-script-btn-proximo='true']", function () {
                var wScriptCodigo = $(this).attr("data-script-btn-omt");
                var wScriptItem = $(this).attr("data-script-btn-omt-item");
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

                _ccSyscare1.cria(parseInt(wScriptItem))
            })
        },

        clickAnterior: async () => {

        }
    }

    this.monta = {
        htmlCabecalho: async () => {
            var wData = await _ccSyscare1.busca.buscaRegulacaoScript()
            var wHtml = "";
            for (let wIdx = 0; wIdx < wData.length; wIdx++) {
                const wScript = wData[wIdx];
                //console.log(wScript);
                wHtml += `<button data-btn-script='true' class="mx-1 ml-4 mb-2 btn cc-bg-cinza-escuro cc-text-branco upper-case" type="button" data-script="${wScript.cnRegulacaoScript}" >${wScript.nmRegulacaoScript}</button>`
            }
            $("[name='frmshc.paginaprincipal']").html(`                   
                <div style="max-width: 800px;margin-left: auto;margin-right: auto;background-color:white;display: grid; " class="container-inputs">
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
                            <input value="${window.cc.global.cnProfissional}" maxlength="50" name="cnProfissional" data-interacao-tp="1" class="form-control cc-col-4" placeholder="" readonly>                         </div>
                                                                    
                    </div>
                    <div name="mnu-scripts" style="background-color:white">${wHtml}</div>
                    <hr style="background-color:white">
                    <div name="fme-scripts" style="background-color:white"></div>
                </div>
            `);
        },
        htmlInput: async (pScriptItem) => {
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
                    break;
                default:
                    break;
            }
            return wHtml;
        },

        buttonAnterior: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            var wHtmlAnterior = `<div class=" cc-btn-col  cc-col cc-col-3  ">
                                    <button data-script-btn-anterior='true' data-script-btn-omt-index='${wScriptItem}'data-script-btn-omt='${wScriptItem.cnRegulacaoScript}'  data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
                                        <i class="fas fa-arrow-left"></i>
                                        Anterior
                                    </button>
                                </div>
                            `;
            return wHtmlAnterior
        },

        buttonProximo: async function (pItem) {
            var wScriptItem = regulacaoScript[pItem]
            //console.log(wScriptItem);
            var wHtmlProximo = `<div class=" cc-btn-col  cc-col cc-col-3  ">
                                    <button data-script-btn-proximo='true' data-script-btn-omt-index='${wScriptItem}'data-script-btn-omt='${wScriptItem.cnRegulacaoScript}'  data-script-btn-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="cc-btn btn btn-block  cc-bg-preto cc-text-branco m-3 cc-bg-preto cc-text-branco m-3">
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
                    <div data-obj-seq="100" class="cc-row" style="border-color: rgb(0 0 0 / 40%); " id="data-buttons-principal">
                        ${wHtmlButtons}
                    </div>
                    <div class="cc-inp cc-col cc-col-16 cc-row" data-interacao-tp="1" style="float:left; ">
                        <label for="anObservacao"><strong>OBSERVAÇÃO</strong></label>
                        <textarea value="" maxlength="5000" name="anObservacao" data-script-omt='${wScriptItem.cnRegulacaoScript}'  
                        data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' data-interacao-tp="1" class="form-control" placeholder="" style="height: 70px"></textarea>
                    </div>
                    <div class=" cc-btn-col  cc-col cc-col-4 mr-3" style="float: right; ">
                        <button data-script-btn-finalizar='true' data-script-omt-item='${wScriptItem.csRegulacaoScriptItem}' class="cc-btn btn btn-block cc-bg-verde cc-text-branco m-3 cc-bg-preto cc-text-branco m-3" >
                            FINALIZAR
                        </button>
                    </div>
                </div>
            `);

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
                        console.log("error:", error);
                    }
                }
            )
        },

        buscaRegulacaoScriptItens: async function (pScript) {
            //console.log(wScriptCodigo);
            var wTabelaNome = "shcregulacaoscriptitem"
            var wColunas =
                "cnRegulacaoScript,csRegulacaoScriptItem,nrOrdem,anInteracaoTexto,cnInteracaoTP,qtInteracaoTamanho,qtInteracaoOpcao,anInteracaoCondicional";
            wColunas +=
                ",anInstrucoes,anDirecionamentoCondicional,cnDirecionamentoScript,cnDirecionamentoScriptItem,boScriptFim,boRequerido,qtInteracaoColspan";
            var wJsnObjScriptItem = `{
                    obj : '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + wTabelaNome + "&colunas=" + wColunas + "&orderby=nrOrdem&where=cnRegulacaoScript=" + pScript), +1, 10, 0, 0, 1)}'
                }`;
            console.log(wJsonScriptRegulacao);
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
                    //console.log("vai filhao", wData);
                    window.regulacaoScript = wData
                    _ccSyscare1.cria(0)
                })
        }
    }

    this.inicia = async function () {
        await _ccSyscare1.monta.htmlCabecalho()
        await _ccSyscare1.listen.clickScript()
    }


}

var _ccSyscare1 = new _ccSyscareScript();