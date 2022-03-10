var _ccaseRelatorios = function() {


    /* MODAL REPORT */
    this.cria = {
        relatorio: async function(pRelatorio, pReferencia, pBoContemSubRelatorios) {
            /* VARIAVEL GLOBAL */
            window.wMrelatorios = [];
            const wRelatorioPai = _cc.string.valor(pRelatorio, 1)
            if (pBoContemSubRelatorios) {
                var wMFilhos = await _ccObj.retorna.filhos(wRelatorioPai);
                var wMrelatorio = []

                if (!wMFilhos.data) {
                    _cc.msg("Objeto [" + pRelatorio + "] não contem objetos relacionados do tipo [REL]", "danger", 11);
                    return false;
                }

                wMFilhos["data"].forEach(element => {
                    if ((element.OBJ_TP).toUpperCase() == "REL") {
                        wMrelatorio.push(element.OBJ_NOME);
                    }
                });
            } else {
                var wMrelatorio = [pRelatorio]
            }
            /* LIMPA REFERENCIA */
            //$("[name='" + cc.blocoHtml.conteudo + "']").html("")
            //$("[name='" + wReferencia + "']").html("")




            for (let wIdx = 0; wIdx < wMrelatorio.length; wIdx++) {
                /* OBJETO */
                const wRelatorio = _cc.string.valor(wMrelatorio[wIdx], 1);

                var wReferencia = _cc.string.valor(pReferencia, 1);

                /* VARIAVEIS */
                var wReferenciaCursor = _cc.string.valor(_ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_CURSOR"), 1),
                    wReferenciaBody = _cc.string.valor(_ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_BODY"), 1),
                    //wReferenciaCabecalho = _cc.string.valor(_ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_CABECALHO"), 1),
                    //wReferenciaRodape = _ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_RODAPE"),
                    wReferenciaFiltro = _ccPrp.consulta(wRelatorioPai, "OBJ_REFERENCIA_FILTRO"),
                    wReferenciaOutPut = _cc.string.valor(_ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_OUTPUT"), 1),
                    wReferenciaButtons = _cc.string.valor(_ccPrp.consulta(wRelatorioPai, "OBJ_REFERENCIA_BUTTON"), 1),
                    //wCabecalhoOff = _ccPrp.consulta(wRelatorio, "REPORT_CABECHALHO_FILTRO_OFF"),
                    //wRodapeOff = _ccPrp.consulta(wRelatorio, "REPORT_RODAPE_MAIN_OFF"),
                    //wFiltroOff = _ccPrp.consulta(wRelatorio, "REPORT_CABECHALHO_FILTRO_OFF"),
                    //wSeqOff = _ccPrp.consulta(wRelatorio, "REPORT_SEQ_OFF"),
                    //wSintetico = _ccPrp.consulta(wRelatorio, "REPORT_SINTETICO_ANALITICO"),
                    //wReportTipo = _ccPrp.consulta(wRelatorio, "REPORT_TP"),
                    wReportDisable = _ccPrp.consulta(wRelatorioPai, "DISABLE"),
                    wTitulo = _ccPrp.consulta(wRelatorioPai, "TITULO");


                /* RELATORIO DESABILITADO */
                if (wReportDisable) { return false; }


                var wRelPrps = "",
                    wRelCssClass = "";

                /* PROPRIEDADES */
                wRelPrps += "id='" + wRelatorio + "-" + wIdx + "' ";
                wRelPrps += "name='" + wRelatorio + "-" + wIdx + "' ";
                wRelPrps += "data-obj-tp='fme' ";
                wRelPrps += "data-title='" + wRelatorio + "' ";
                wRelPrps += "data-obj-nome='" + wRelatorio + "-" + wIdx + "' ";
                wRelPrps += "data-obj-tipo='fme' ";

                /* CSS CLASS */
                wRelCssClass += "cc-fme cc-row ";

                wRelHtm = "<div " + wRelPrps + " class='" + wRelCssClass + "' name='" + wRelatorioPai + "-outputRelatorio' >"
                    /* TITULO */
                wRelHtm += "<div class='cc-titulo float-left w-100 pt-1 pb-1  cc-border-bottom-50 mt-1 mb-3 '>"
                    //wRelHtm += "    <h4 class='p-2 m-0 '>" + wTitulo + "</h4>"
                wRelHtm += "</div>"
                    /* FILTRO FME */
                wRelHtm += "<div class='' data-obj-seq='10' name='" + wRelatorioPai + "-" + wIdx + ".filtro'> "
                wRelHtm += "</div>"
                    /* BUTTONS FME */
                wRelHtm += "<div class='' data-obj-seq='20' name='" + wRelatorioPai + "-" + wIdx + ".buttons' >"
                wRelHtm += "</div>"
                    /* OUTPUT FME */
                wRelHtm += "<div class='' data-obj-seq='30' name='" + wRelatorioPai + ".output' >"
                wRelHtm += "</div>"
                    /* FECHA FME DIV */
                wRelHtm += "</div>"


                /* APPEND DO FORM NO HTML */
                if (wIdx == 0) {
                    if ($("[name='" + wRelatorio + "']").length > 0) {
                        $("[name='" + wRelatorio + "']").replaceWith(wRelHtm);
                    } else {
                        if ($("[name='" + wReferencia + "']").length == 0) {
                            $("[name='" + cc.blocoHtml.conteudo + "']").append(wRelHtm);
                        } else {
                            $("[name='" + wReferencia + "']").append(wRelHtm);
                        }
                    }
                }
                /* VALIDA PARAMETROS REQUERIDO */
                if (!wReferenciaCursor) {
                    _cc.msg("Propriedade [OBJ_REFERENCIA_CURSOR] requerido para o obj tipo [REL]", "danger", 11);
                    return false;
                }
                if (!wReferenciaBody) {
                    _cc.msg("Propriedade [OBJ_REFERENCIA_BODY] requerido para o obj tipo [REL]", "danger", 11);
                    return false;
                }
                if (!wReferenciaOutPut) {
                    _cc.msg("Propriedade [OBJ_REFERENCIA_OUTPUT] requerido para o obj tipo [REL]", "danger", 11);
                    return false;
                }
                if (!wReferenciaButtons) {
                    _cc.msg("Propriedade [OBJ_REFERENCIA_BUTTOM] requerido para o obj tipo [REL]", "danger", 11);
                    return false;
                }

                if (!wReferenciaFiltro) {
                    _cc.msg("Propriedade [OBJ_REFERENCIA_FILTRO] requerido para o obj tipo [REL]", "danger", 11);
                    return false;
                }

                await new Promise(async function(resolve, reject) {
                    if (wIdx == 0) {
                        /* FLOAD FILTRO */
                        await _ccFme.cria(wReferenciaFiltro, wRelatorioPai + "-" + wIdx + ".filtro");
                        /* FLOAD FME BUTTONS */
                        await _ccFme.cria(wReferenciaButtons, wRelatorioPai + "-" + wIdx + ".buttons");
                        /* FLOAD BUTTONS FME BUTTONS */
                        await _ccRel.cria.buttons(wReferenciaButtons)
                    }
                    /* FLOAD OUTPUT */
                    await _ccFme.cria(wReferenciaOutPut, wRelatorioPai + ".output");



                    resolve()
                })

                /* BUSCA INPUTS COLUNAS BODY */
                _ccRel.busca.inputs(wReferenciaBody, wRelatorio);
            }
        },
        filtro: function(pMFiltros, pRelatorio) {
            wReferenciaFiltro = _ccPrp.consulta(pRelatorio, "OBJ_REFERENCIA_FILTRO")
            for (let wIdx = 0; wIdx < pMFiltros.length; wIdx++) {
                /* CRIA INPUT */
                _ccInp.cria(pMFiltros[wIdx], wReferenciaFiltro);
            }
        },
        buttons: async function(pReferenciaButtons) {
            var wButton = await _ccObj.retorna.filhos(_cc.string.valor(pReferenciaButtons, 1));
            var wMButton = wButton.data;

            if (!wMButton) {
                _cc.msg("Objeto [" + pReferenciaButtons + "] não contem objetos relacionado do tipo [BTN]", "danger", 11);
                return false;
            }
            for (let wIdx = 0; wIdx < wMButton.length; wIdx++) {
                /* CRIA BUTTON */
                await _ccBtn.cria(wMButton[wIdx]["OBJ_NOME"]);
            }
        }

    }
    this.busca = {
        inputs: async function(pBody, pRelatorio, pBoSubRelatorio, pObjReferencia, pWhere) {
            /* BUSCA FILHOS */
            var wMObjetos = fBuscaInputsRecursivo(pBody)

            //console.log("wMObjetos")
            //console.log(wMObjetos)

            if (!wMObjetos) {
                _cc.msg("Nenhum input localizado no elemento body [" + pBody + "]", "danger", 11);
                return false;
            }
            /* MATRIZ */
            var wMInputFiltro = [],
                wMInputTitulo = [],
                wMColunasCursor = [],
                wMInputMaskList = [],
                wMInputFload = [],
                wMInputGrafico = [],
                wColunasCursor = "";
            /* LOOP FOR INPUTS BODY */

            for (let wIdx = 0; wIdx < wMObjetos.length; wIdx++) {
                /* OBJ NAME */
                const wObjeto = wMObjetos[wIdx];


                /* VERIFICA SE Ã‰ UM SUB RELATORIO */
                if (_ccPrp.consulta(wObjeto, "OBJ_REFERENCIA_BODY")) {
                    console.log("pushhhh")
                    wMInputFload.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "OBJ_NOME")))
                    continue;
                }

                /* INPUT HIDDEN */
                if (_ccPrp.consulta(wObjeto, "HIDDEN") !== "1") {
                    wMInputFload.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "OBJ_NOME")))
                }
                /* COLUNA FILTRO */
                if (_ccPrp.consulta(wObjeto, "COL_FILTRO") == 1) {
                    wMInputFiltro.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "OBJ_NOME")))
                }
                /* SE A COLUNA FOR IMPRESSA */
                if (_ccPrp.consulta(wObjeto, "IMPRIME_OFF") !== "1") {
                    /* COL NAME */
                    wColuna = (subStr(wObjeto, wObjeto.lastIndexOf('.') + 1, wObjeto.length))
                        /* SE A COLUNA NÃƒO FOR VIRTUAL */
                    if (_ccPrp.consulta(wObjeto, "COL_VIRTUAL") !== "1") {
                        wColunasCursor += wColuna.replace("fk", ".") + ",";
                    } else {
                        let wValue = _cc.string.valor(_ccPrp.consulta(wObjeto, "VALUE"), 1)
                        wValue = (wValue == "") ? "''" : wValue;
                        wColunasCursor += wValue + " AS " + wColuna.replace("fk", ".") + ",";
                    }
                    /* PUSH wM*/
                    wMInputTitulo.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "TITULO")))
                    wMInputGrafico.push(_ccPrp.consulta(wObjeto, "CHART_ORIENTACAO"))
                    wMColunasCursor.push(wColuna.replace("fk", "."));
                    wMInputMaskList.push(_ccPrp.consulta(wObjeto, 'ListMask'))
                }
            }

            //wMColunasCursor = wMColunasCursor.split(",")
            wColunasCursor = wColunasCursor.substring(0, wColunasCursor.lastIndexOf(","))
            wCursor = _cc.string.valor(_ccPrp.consulta(pRelatorio, "OBJ_REFERENCIA_CURSOR"), 1)

            wMatriz = []
            wMatriz.push({ wCursor, wMInputTitulo, wMColunasCursor, pRelatorio, wMInputFiltro, wMInputMaskList, wMInputFload, wColunasCursor, wMInputGrafico, wMInputFiltro })


            if (!pBoSubRelatorio) {
                /* MONTA FILTROS */
                _ccRel.cria.filtro(wMInputFiltro, pRelatorio)
                    /* LISTEN */
                _ccRel.listen.buttons(wMatriz, pRelatorio)
            } else {
                var element = wMatriz[0],
                    wRelatorio = element.pRelatorio,
                    wMGrafico = element.wMInputGrafico,
                    wCursor = element.wCursor,
                    wFiltros = element.wMInputFiltro,
                    wColunasCursor = element.wColunasCursor,
                    wReferenciaOutPut = _cc.string.valor(_ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_OUTPUT"), 1),
                    wReferenciaFiltro = _cc.string.valor(_ccPrp.consulta(element.pRelatorio, "OBJ_REFERENCIA_FILTRO"), 1)


                /* SE HOUVER OBRIGATORIO N PREENCHIDO */
                if (_ccRel.validaInputs(wReferenciaFiltro).length) { return; }

                /* BUSCA WHERE  */
                var wWhere = await _ccRel.busca.where(wFiltros)

                let wSintetico = "0";
                if (document.getElementById("frmshc.sintetico")) {
                    wSintetico = $(document.getElementById("frmshc.sintetico")).prop('checked')
                    wSintetico = (wSintetico == true) ? 1 : 0;
                }

                if (pWhere) {
                    wWhere = pWhere
                } else {
                    wWhere = wWhere.where
                }

                var wDataResult = await _ccCur.execulta.ajax(wCursor, wWhere, wSintetico, wColunasCursor)
                var wTpReport = _cc.string.valor(_ccPrp.consulta(cLower(wReferenciaOutPut), "REPORT_TP"), 1)

                if (wDataResult) {

                    await ccaseReportPrint(wDataResult, element.wMInputTitulo, element.wMColunasCursor, pObjReferencia, element.pRelatorio, wWhere.filtroStr, element.wMInputMaskList, element.pRelatorio, wMGrafico, element.wMInputFload)

                    //await ccaseReportPrintForm(wDataResult, element.wMInputTitulo, element.wMColunasCursor, wReferenciaOutPut, element.pRelatorio, wWhere.filtroStr, element.wMInputMaskList, element.pRelatorio, element.wMInputFload, pObjReferencia)


                }
            }


        },
        where: async function(pMObjNome) {
            let wMObjNome = pMObjNome;
            let wWhere = "";
            let wFiltroStr = "";

            /* SE NAO HOUVER FILTRO */
            if (!wMObjNome) {
                return {
                    "where": "",
                    "filtroStr": ""
                }
            }
            wMObjNome.forEach(wInp => {
                let wTitulo = _ccPrp.consulta(cLower(wInp), "TITULO")
                let wColFiltroRelacinado = _cc.string.valor(cLower(_ccPrp.consulta(wInp, "COL_FILTRO_RELACIONADO")))
                if (wColFiltroRelacinado !== "") {
                    var wValueRelacionado = $(document.getElementById(cLower(wInp))).val();
                    if (wValueRelacionado) {
                        wValue = wValueRelacionado;
                    } else {
                        var wIdx = wMcolFiltroRelacionado.indexOf(wColFiltroRelacinado)
                        var wObj = wMcolFiltroRelacionadoValor[wIdx]
                        wValue = $(document.getElementById(cLower(wObj))).val();
                    }
                } else {
                    var wValue = $(document.getElementById(cLower(wInp))).val();
                }
                if (wValue) {
                    var wOperador = _ccPrp.consulta(cLower(wInp), "COL_FILTRO_OPERADOR")
                    wOperador = (wOperador == "") ? 1 : wOperador;
                    var wColuna = subStr(wInp, wInp.lastIndexOf('.') + 1, wInp.length)
                    if (wColuna.indexOf("fk") > 1) {
                        wColuna = wColuna.replace("fk", ".");
                    }
                    if (wOperador == 9) {
                        if (wColFiltroRelacinado !== "" && !wValueRelacionado) {
                            wInicio = $("[data-inp-obj-nome='" + wObj + "']").val()
                            wFim = $("[data-inp-obj-nome='" + wObj + "']:last").val()
                        } else {
                            wInicio = $("[data-inp-obj-nome='" + wInp + "']").val()
                            wFim = $("[data-inp-obj-nome='" + wInp + "']:last").val()
                        }
                        wFiltroStr += "&nbsp;" + wTitulo + " de  " + wInicio + " atÃ© " + wFim + " &nbsp; ";
                        wWhere += wColuna + " >='" + wInicio + "' and " + wColuna + "<='" + wFim + "' and "
                    } else {
                        wFiltroStr += " &nbsp; " + wTitulo + " : " + wValue + " &nbsp; ";
                        wWhere += wColuna + " " + fOperador(wValue, wOperador) + " and "
                    }
                }
            });
            return {
                "where": subStr(wWhere, 0, wWhere.lastIndexOf('and')),
                "filtroStr": wFiltroStr
            }
        },
    }

    this.validaInputs = function(wFmeFiltros) {
        /* VARIAVEIS */
        var wInpBoNull = []
        $("[data-obj-referencia='" + wFmeFiltros + "'][required='required']").each(function(wIdx, wEl) {
            if ($.trim($(wEl).val()) == "") {
                /* INSERT */
                if ($(this).attr("data-inp-auto-increment") != "true") {
                    if ($(this).attr("data-inp-sequence") != "true") {
                        if ($(this).attr("data-inp-unique-key") != "true") {
                            if ($(this).attr("data-inp-primary-key") != "true") {
                                wInpBoNull.push($(wEl).attr("data-inp-name"));
                                $(wEl).addClass("border border-danger");
                                $(wEl).closest(".cc-inp").find("label").addClass("text-danger");
                            }
                        }
                    }
                }
            }
        });

        if (wInpBoNull.length > 0) {
            _cc.msg("HÃ¡ campos obrigatÃ³rios não preenchidos", "danger", 4);
        }
        return wInpBoNull;
    }

    this.listen = {
        buttons: async function(wM, pRelatorio) {

            /* PUSH NEW RELATORIO */

            window.wMrelatorios.push(wM)

            var wBtnGerar = _cc.string.valor(_ccPrp.consulta(pRelatorio, "OBJ_REFERENCIA_BTN_GERAR"), 1);
            /* LISTEN EVENT CLICK GERAR */

            await $(document).off(cc.evento.click, "[name='" + wBtnGerar + "']");
            await $(document).on(cc.evento.click, "[name='" + wBtnGerar + "']", async function() {

                console.log("Length INICIO " + wMrelatorios.length)
                var wOutput = _ccPrp.consulta(_cc.string.valor(wMrelatorios[0][0].pRelatorio, 1), "OBJ_REFERENCIA_OUTPUT")
                    //$("[name='" + wOutput + "']").empty();
                console.log("wOutput " + wOutput)
                _cc.loading.show("Aguarde", 1, "cc-rel")
                for (let wIdx = 0; wIdx < wMrelatorios.length; wIdx++) {

                    console.log("CLICK ")
                    console.log(wMrelatorios[wIdx][0])
                    var element = wMrelatorios[wIdx][0],
                        wRelatorio = element.pRelatorio,
                        wMGrafico = element.wMInputGrafico,
                        wCursor = element.wCursor,
                        wFiltros = element.wMInputFiltro,
                        wColunasCursor = element.wColunasCursor,
                        wReferenciaOutPut = _cc.string.valor(_ccPrp.consulta(wRelatorio, "OBJ_REFERENCIA_OUTPUT"), 1),
                        wReferenciaFiltro = _cc.string.valor(_ccPrp.consulta(element.pRelatorio, "OBJ_REFERENCIA_FILTRO"), 1)


                    /* SE HOUVER OBRIGATORIO N PREENCHIDO */
                    if (_ccRel.validaInputs(wReferenciaFiltro).length) { _cc.loading.hide("cc-rel"); return; }

                    /* BUSCA WHERE  */
                    var wWhere = await _ccRel.busca.where(wFiltros)

                    let wSintetico = "0";
                    if (document.getElementById("frmshc.sintetico")) {
                        wSintetico = $(document.getElementById("frmshc.sintetico")).prop('checked')
                        wSintetico = (wSintetico == true) ? 1 : 0;
                    }

                    var wDataResult = await _ccCur.execulta.ajax(wCursor, wWhere.where, wSintetico, wColunasCursor)
                    var wTpReport = _cc.string.valor(_ccPrp.consulta(cLower(wReferenciaOutPut), "REPORT_TP"), 1)
                    console.log("wReferenciaOutPut ", wReferenciaOutPut)
                    if (wDataResult) {
                        if (wTpReport == 1) {
                            /* LISTAGEM */
                            wReportOutPutGrafico = "teste"
                            await ccaseReportPrint(wDataResult, element.wMInputTitulo, element.wMColunasCursor, wReferenciaOutPut, element.pRelatorio, wWhere.filtroStr, element.wMInputMaskList, element.pRelatorio, wMGrafico, element.wMInputFload, wReportOutPutGrafico)
                        } else if (wTpReport == 2) {
                            const wMobjetoFload = element.wMobjetoFload
                            await ccaseReportPrintForm(wDataResult, element.wMInputTitulo, element.wMColunasCursor, wReferenciaOutPut, element.pRelatorio, wWhere.filtroStr, element.wMInputMaskList, element.pRelatorio, element.wMInputFload)

                        } else {
                            _cc.loading.hide("w-dados");
                            _cc.msg("PROPRIEDADE [REPORT_TP] INVALIDA", "danger", 30);
                            console.log(wReferenciaOutPut)
                            return;
                        }
                    }
                    await $("[data-btn-acao-padrao=47]").on("click", async function() {
                        var wTitulo = _ccPrp.consulta(cLower(element.wReport), "TITULO")
                        await fExportExcel("relatorio-table-" + element.wReport + "", wTitulo, element.wReport)
                        setTimeout(function() {
                            /* FECHA LOADING */
                            _cc.msg("Download concluÃ­do", 'success', 30)
                        }, 1000);
                    });
                    await $("[data-btn-acao-padrao=98]").on("click", async function() {
                        await fDataTablesReport("relatorio-table-" + element.wReport + "")
                    });

                    await $("[data-btn-acao-padrao=48]").on("click", async function() {
                        //console.log(element.wReport)
                        _ccPrintDiv("relatorio-table-" + element.wReport + "", element.wReport)
                            // _ccPrintM("relatorio-table-" + element.wReport + "")
                    });

                    _cc.loading.hide("w-dados");
                }
                _cc.loading.hide("cc-rel")
                console.log("Length FIM " + wMrelatorios.length)
            });
        }
    }

};

var _ccRel = new _ccaseRelatorios();




var _ccaseReport = function() {


    /* MODAL REPORT */
    this.cria = {
            relatorio: async function(pReport, pReferencia) {

                /* VARIAVEIS */
                var wReportName = _cc.string.valor(pReport, 1);
                var wReportObjReferencia = _cc.string.valor(pReferencia, 1);
                var wReportBody = _cc.string.valor(_ccPrp.consulta(wReportName, "OBJ_REFERENCIA_BODY"), 1);
                var wFmeButtons = _cc.string.valor(_ccPrp.consulta(wReportName, "OBJ_REFERENCIA_BUTTON"), 1);

                $("[name='" + wReportObjReferencia + "']").empty()
                _ccFme.cria(wReportName, wReportObjReferencia);

                /* MATRIZ COLUNAS */
                var wMColunas = await _ccRpt.busca.colunas(wReportBody);

                /* CONSTROI FILTROS  */
                await _ccRpt.cria.filtro(wReportName, wReportBody, wMColunas["wMInputFiltro"]);
                await _ccRpt.cria.button(wReportName, wFmeButtons)


                var wBtnGerarReport = await $("[name='" + wFmeButtons + "']").find("button[data-btn-acao-padrao='15']").attr("name")
                    /* LISTEN */
                await $(document).off(cc.evento.click, "[name='" + wBtnGerarReport + "']");
                await $(document).on(cc.evento.click, "[name='" + wBtnGerarReport + "']", async function() {
                    /* VALIDA FILTRO OBRIGATORIO */
                    var wObrigatorioNPreenchido = _ccRpt.valida.filtro(wReportBody)

                    if (wObrigatorioNPreenchido.length) { return };

                    /* MONTA WHERE */
                    var wWhereCursor = await _ccRpt.cria.where(wMColunas["wMInputFiltro"]);
                    var wReportOutput = _cc.string.valor(_ccPrp.consulta(pReport, "REPORT_OUTPUT"), 1);

                    /* CRIA FME DE OUTPUT */
                    _ccFme.cria(wReportOutput, wReportName);
                    /* LOADING SHOW */
                    _cc.loading.show("Gerando Relatorio", 1, wReportName - "loading")
                    var wHmtl = await _ccRpt.cria.table(wReportName, wMColunas, wWhereCursor)

                    $("[name='" + wReportOutput + "']").append(wHmtl)


                    $(document).off(cc.evento.click, "[data-grafico-obj]");
                    $(document).on(cc.evento.click, "[data-grafico-obj]", async function(e) {
                        var wInpNome = $(this).attr("data-grafico-obj");
                        var wInpColuna = $(this).attr("data-coluna");
                        var wInpTitulo = $(this).attr("data-grafico-titulo");
                        var wInpIndexLine = $(this).attr("data-index");
                        var wInpChtOrientacao = $(this).attr("data-grafico-orientacao");
                        var wInpReportNome = $(this).attr("data-grafico-report");
                        var wDataResult = cc.matriz.rpt_dados["" + wInpReportNome + ""];
                        var wMColunasChart = eval(_cc.string.replace.caracteresCcase(_ccPrp.consulta(wInpNome, "CHART_COLUNAS"), 1));
                        var wMLabelChart = eval(_cc.string.replace.caracteresCcase(_ccPrp.consulta(wInpNome, "CHART_COL_NOME_LABEL"), 1));
                        var wMColunasBgChart = eval(_cc.string.replace.caracteresCcase(_ccPrp.consulta(wInpNome, "CHART_COLOR_BACKGROUND"), 1));
                        var wMColunasBordaChart = eval(_cc.string.replace.caracteresCcase(_ccPrp.consulta(wInpNome, "CHART_COLOR_BORDER"), 1));
                        var wChartTP = _ccPrp.consulta(wInpNome, "CHART_TP");
                        var wChartOutput = _cc.string.valor(_ccPrp.consulta(wInpNome, "REPORT_OUTPUT_CHART"), 1)


                        $("[name='" + wChartOutput + "']").remove()
                        _ccFme.cria(wChartOutput, wReportName);

                        var wHtmlOutPutGrafico = await _ccRpt.cria.chart(wReportName, wChartOutput)
                        $("[name='" + wChartOutput + "']").append(wHtmlOutPutGrafico)

                        switch (parseInt(wInpChtOrientacao)) {
                            case 1: //VERTICAL
                                var wDataResultRow = wDataResult.data;
                                var wMValores = [];
                                var wMLabelChartCols = []
                                var wMColunasBgChart = []


                                for (let wIdX = 0; wIdX < wDataResultRow.length; wIdX++) {
                                    wMValores.push(wDataResultRow[wIdX]["" + wInpColuna + ""])
                                    wMLabelChartCols.push(wDataResultRow[wIdX]["" + wMLabelChart[0] + ""])
                                    wMColunasBgChart.push('#' + Math.floor(Math.random() * 16777122).toString(16));
                                }
                                wMColunasBordaChart = wMColunasBgChart
                                wMLabelChart = wMLabelChartCols
                                break;
                            case 2: //HORIZONTAL
                                var wDataResultRow = wDataResult.data[wInpIndexLine];
                                var wMValores = [];
                                wMColunasChart = eval(wMColunasChart);
                                for (let wIdX = 0; wIdX < wMColunasChart.length; wIdX++) {
                                    const wColuna = wMColunasChart[wIdX];
                                    wMValores.push(wDataResultRow["" + wColuna + ""])
                                }
                                break;
                            default:
                                break;
                        }

                        var wCtx = $(`[name='canvas-${wChartOutput}-chart-${wReportName}']`);

                        //console.log(wCtx)
                        var wOptions = {
                            type: wChartTP,
                            data: {
                                labels: wMLabelChart,
                                datasets: [{
                                    label: wMLabelChart,
                                    data: wMValores,
                                    backgroundColor: wMColunasBgChart,
                                    borderColor: wMColunasBordaChart,
                                    borderWidth: 2
                                }]
                            }
                        }
                        new Chart(wCtx, wOptions)
                    })

                    /* LOADING HIDE */
                    _cc.loading.hide(wReportName - "loading")

                });





            },
            where: async function(wMObjFiltros) {
                var wWhere = "";
                wMObjFiltros.forEach(objFiltro => {
                    var wInp = _cc.string.valor(objFiltro, 1)
                    var wValueInp = $(document.getElementById(wInp)).val();
                    if (wValueInp) {
                        var wOperador = _ccPrp.consulta(wInp, "COL_FILTRO_OPERADOR") || 1;

                        var wColuna = subStr(wInp, wInp.lastIndexOf('.') + 1, wInp.length)
                        if (wColuna.indexOf("fk") >= 1) {
                            wColuna = wColuna.replace("fk", ".");
                        }
                        wWhere += wColuna + " " + fOperador(wValueInp, wOperador) + " and "
                    }

                });
                return subStr(wWhere, 0, wWhere.lastIndexOf('and'))

            },
            button: async function(pReportObjReferencia, pFmeButtons) {
                /* CRIA FME */
                _ccFme.cria(pFmeButtons, pReportObjReferencia);
                var wButton = await _ccObj.retorna.filhos(_cc.string.valor(pFmeButtons, 1));
                var wMButton = wButton.data;

                if (!wMButton) {
                    _cc.msg("Objeto [" + pFmeButtons + "] não contem objetos relacionado do tipo [BTN]", "danger", 11);
                    return false;
                }
                for (let wIdx = 0; wIdx < wMButton.length; wIdx++) {
                    /* CRIA BUTTON */
                    await _ccBtn.cria(wMButton[wIdx]["OBJ_NOME"]);
                }
                return true;
            },
            filtro: async function(pReportObjReferencia, pReportBody, wMObjetosInputs) {
                /* CRIA FME */
                _ccFme.cria(pReportBody, pReportObjReferencia);
                /* CRIA INPUT`S */
                wMObjetosInputs.forEach(objInp => {
                    _ccInp.cria(objInp, pReportBody);
                });

            },
            chart: async function(pReport, pChartOutput) {
                var wHtml = `
                <div name='fme-${pReport}' >
                    <canvas  name='canvas-${pChartOutput}-chart-${pReport}'></canvas>
                </div>
                `
                return wHtml;
            },
            table: async function(pReport, wMColunas, pWhere) {
                var wMTitulo = wMColunas["wMInputTitulo"],
                    wMColsCursor = wMColunas["wMColunasCursor"],
                    wStrColsCursor = wMColunas["wColunasCursor"],
                    wReportCursor = _ccPrp.consulta(pReport, "OBJ_REFERENCIA_CURSOR");

                /* EXECULTA CURSOR */
                return await _ccCur.execulta.ajax(wReportCursor, pWhere, 0, wStrColsCursor).then((wResultAjax) => {
                    /* VALIDA AJAX */
                    _cc.validaResultadoAjax(wResultAjax, "");

                    cc.matriz.rpt_dados["" + pReport + ""] = wResultAjax;

                    var wDataResult = wResultAjax.data;
                    var wHtmThead = "";
                    var wHtmTbody = "";
                    var wHtm = ";"

                    /* THEAD */
                    for (let wIdx = 0; wIdx < wMTitulo.length; wIdx++) {
                        const pConteudo = wMTitulo[wIdx];
                        if (wMColunas["wMInputGrafico"][wIdx] == 1) {
                            /* GRAFICO VERTICAL */
                            wHtmThead += ("<th  name='" + wMColunas["wMInputFload"][wIdx] + "' class='cc-grafico-coluna text-center' data-grafico-titulo='" + pConteudo + "' data-grafico-report='" + pReport + "' data-grafico-orientacao='1'  data-coluna='" + wMColsCursor[wIdx] + "' data-grafico-obj='" + wMColunas["wMInputFload"][wIdx] + "' >" + pConteudo + "<br><i class='fas fa-chart-bar text-danger' aria-hidden='true'></i></th>")
                        } else {
                            wHtmThead += ("<th name='" + wMColunas["wMInputFload"][wIdx] + "' class='cc-grafico-coluna text-center'  >" + pConteudo + "</th>")
                        }

                    }



                    /* TBODY */
                    for (let wIdx = 0; wIdx < wDataResult.length; wIdx++) {

                        wHtmTbody += "<tr>"
                        for (let wIdxY = 0; wIdxY < wMColsCursor.length; wIdxY++) {
                            if (wMColunas["wMInputGrafico"][wIdxY] == 2) {
                                /* GRAFICO HORIZONTAL */
                                wHtmTbody += "<td class='text-center' data-grafico-report='" + pReport + "' data-grafico-orientacao='2' data-index='" + wIdx + "' data-coluna='" + wMColsCursor[wIdxY] + "' data-grafico-obj='" + wMColunas["wMInputFload"][wIdxY] + "' ><i class='fas fa-chart-bar text-danger' aria-hidden='true'></i></td>"
                            } else {
                                const wColuna = wDataResult[wIdx][wMColsCursor[wIdxY]];
                                wHtmTbody += "<td data-index='" + wIdx + "' data-coluna='" + wMColsCursor[wIdxY] + "'>" + wColuna + "</td>"
                            }

                        }
                        wHtmTbody += "</tr>"
                    }

                    /* HTML */
                    wHtm = `
                        <div name="${pReport}-report">
                            <table class="table">
                                <thead class="thead-dark" name="${pReport}-report-thead">    
                                ${wHtmThead}
                                </thead>
                                <tbody name="${pReport}-report-tbody">
                                    ${wHtmTbody}
                                </tbody>
                            </table>
                        </div>
                        `
                    return wHtm;

                }).catch((err) => {
                    alert(err)
                    console.log(err)
                });


            }

        },
        this.valida = {
            filtro: function(pFmeBody) {
                /* VARIAVEIS */
                var wInpBoNull = []
                var wHtmlTitulo = "";
                $("[data-obj-referencia='" + pFmeBody + "'][required='required']").each(function(wIdx, wEl) {
                    if ($.trim($(wEl).val()) == "") {
                        /* INSERT */
                        if ($(this).attr("data-inp-auto-increment") != "true") {
                            if ($(this).attr("data-inp-sequence") != "true") {
                                if ($(this).attr("data-inp-unique-key") != "true") {
                                    if ($(this).attr("data-inp-primary-key") != "true") {
                                        wInpBoNull.push($(wEl).attr("data-inp-name"));
                                        $(wEl).addClass("border border-danger");
                                        $(wEl).closest(".cc-inp").find("label").addClass("text-danger");
                                        wHtmlTitulo += "<br> - " + $("[for='" + $(wEl).attr("data-inp-name") + "']").text() + "";

                                    }
                                }
                            }
                        }
                    } else {
                        $(wEl).closest(".cc-inp").find("label").removeClass("text-danger");
                        $(wEl).removeClass("border");
                        $(wEl).removeClass("border-danger");
                    }
                });

                if (wInpBoNull.length > 0) {
                    _cc.msg("HÃ¡ campos obrigatÃ³rios não preenchidos " + wHtmlTitulo, "danger", 4);
                }
                return wInpBoNull;
            }
        },
        this.busca = {
            colunas: function(pBody) {
                var wMObjetos = fBuscaInputsRecursivo(pBody)
                console.log("wMInputs ", wMObjetos)
                if (!wMObjetos) {
                    _cc.msg("Nenhum input localizado no elemento body [" + pBody + "]", "danger", 11);
                    return false;
                }
                /* MATRIZ */
                var wMInputFiltro = [],
                    wMInputTitulo = [],
                    wMColunasCursor = [],
                    wMInputGrafico = [],
                    wMInputMaskList = [],
                    wMInputFload = [],
                    wColunasCursor = "";
                /* LOOP FOR INPUTS BODY */

                for (let wIdx = 0; wIdx < wMObjetos.length; wIdx++) {
                    /* OBJ NAME */
                    const wObjeto = wMObjetos[wIdx];

                    /* INPUT HIDDEN */
                    if (_ccPrp.consulta(wObjeto, "HIDDEN") !== "1") {
                        wMInputFload.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "OBJ_NOME")))
                    }
                    /* COLUNA FILTRO */
                    if (_ccPrp.consulta(wObjeto, "COL_FILTRO") == 1) {
                        wMInputFiltro.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "OBJ_NOME")))
                    }
                    /* SE A COLUNA FOR IMPRESSA */
                    if (_ccPrp.consulta(wObjeto, "IMPRIME_OFF") !== "1") {
                        /* COL NAME */
                        wColuna = (subStr(wObjeto, wObjeto.lastIndexOf('.') + 1, wObjeto.length))
                            /* SE A COLUNA NÃƒO FOR VIRTUAL */
                        if (_ccPrp.consulta(wObjeto, "COL_VIRTUAL") !== "1") {
                            wColunasCursor += wColuna.replace("fk", ".") + ",";
                        } else {
                            let wValue = _cc.string.valor(_ccPrp.consulta(wObjeto, "VALUE"), 1)
                            wValue = (wValue == "") ? "''" : wValue;
                            wColunasCursor += wValue + " AS " + wColuna.replace("fk", ".") + ",";
                        }

                        /* PUSH wM*/
                        wMInputTitulo.push(_cc.string.valor(_ccPrp.consulta(wObjeto, "TITULO")))
                        wMInputGrafico.push(_ccPrp.consulta(wObjeto, "CHART_ORIENTACAO"))
                        wMColunasCursor.push(wColuna.replace("fk", "."));
                        wMInputMaskList.push(_ccPrp.consulta(wObjeto, 'ListMask'))

                    }
                }
                wColunasCursor = wColunasCursor.substring(0, wColunasCursor.lastIndexOf(","))
                wMatriz = { wMInputTitulo, wMInputGrafico, wMColunasCursor, wMInputFiltro, wMInputMaskList, wMInputFload, wColunasCursor, wMInputFiltro }
                return wMatriz;

            }
        }

}



var _ccaseChart = function() {
    /* MODAL REPORT */
    this.cria = async function(pChart, pReferencia, pHeight) {
        /* VARIAVEIS */
        var wChartObjNome = _cc.string.valor(pChart, 1)
        var wJsonPrps = _ccObj.retorna.json(wChartObjNome).data[wChartObjNome];
        var wObjReferencia = pReferencia || _cc.string.valor(wJsonPrps["OBJ_REFERENCIA"], 1);

        $("[name='" + wObjReferencia + "']").empty()
        var wChtColspan = ccColspan(wChartObjNome),
            wChtBgCor = _cc.string.valor(wJsonPrps["BG_COR"], 1),
            wTitulo = _cc.string.valor(wJsonPrps["TITULO"], 1),
            wChtRowspan = pHeight || _ccPrp.rowspan(wJsonPrps["ROWSPAN"]),
            wMChtColunasName = eval(_cc.string.replace.caracteresCcase(wJsonPrps["CHART_COLUNAS"], 1)),
            wMChtColunasTitulo = eval(_cc.string.replace.caracteresCcase(wJsonPrps["CHART_COL_NOME_LABEL"], 1)),
            wChtCursor = _cc.string.valor(wJsonPrps["CHART_CURSOR"], 1),
            wChtTP = _cc.string.valor(wJsonPrps["CHART_TP"], 1),
            wMChtBgCor = eval(_cc.string.replace.caracteresCcase(wJsonPrps["CHART_COLOR_BACKGROUND"], 1)),
            wMChtBordaCor = wJsonPrps["CHART_COL_NOME_LABEL"],
            wChtCssClass = "",
            wChtPrps = "",
            wChtStyle = "",
            wChtHtm = "";



        wChtStyle += (wChtBgCor) ? ' background-color:' + wChtBgCor + ' !important ;' : ' '


        _ccCur.execulta.ajax(wChtCursor, "", 0).then(async(wResultAjax) => {
            /* VALIDA AJAX */
            console.log("wResultAjax")
            console.log(wResultAjax)
            console.log(wResultAjax.data)
            var wDataResultRow = wResultAjax.data;
            var wMLabelChart = [];
            var wMValores = [];
            var wMColunasBgChart = []
            console.log(wMChtColunasName)
            console.log(wMChtColunasTitulo)
            for (let wIdx = 0; wIdx < wDataResultRow.length; wIdx++) {
                const wRow = wDataResultRow[wIdx];
                console.log(wRow)
                wMLabelChart.push(wRow["" + wMChtColunasTitulo[0] + ""])
                wMValores.push(wRow["" + wMChtColunasName[0] + ""])
                wMColunasBgChart.push('#' + Math.floor(Math.random() * 16777122).toString(16));
            }


            var wHtmlOutPutGrafico = await _ccRpt.cria.chart(wChartObjNome, wObjReferencia)

            console.log("---xx---")
            console.log("label ", wMLabelChart)
            console.log("wMValores ", wMValores)

            wChtHtm += `
                    <div class='${wChtColspan}'>
                        <div  
                            class='cc-fme  cc-row ' 
                            style='${wChtStyle + wChtRowspan}'
                            id='${wChartObjNome}' 
                            name='${wChartObjNome}' 
                            data-obj-tp='fme'>
                            
                            
                        </div>
                    </div>
                        `


            if ($("[name='" + wChartObjNome + "']").length > 0) {
                $("[data-fme-collapse-obj-nome='" + wChartObjNome + "']").remove()
                $("[name='" + wChartObjNome + "']").parent().replaceWith(wChtHtm);
            } else {
                if ($("[name='" + wObjReferencia + "']").length == 0) {
                    $("[name='" + cc.blocoHtml.conteudo + "']").append(wChtHtm);
                } else {

                    $("[name='" + wObjReferencia + "']").append(wChtHtm);
                }
            }

            $("[name='" + wChartObjNome + "']").append(wHtmlOutPutGrafico);


            var wOptions = {
                type: wChtTP,
                data: {
                    labels: wMLabelChart,
                    datasets: [{
                        label: wMLabelChart,
                        data: wMValores,
                        backgroundColor: wMChtBgCor || wMColunasBgChart,
                        borderColor: wMChtBgCor || wMColunasBgChart,
                        borderWidth: 2
                    }]
                },
                options: {
                    maintainAspectRatio: false
                }
            }
            var wCtx = $(`[name='canvas-${wObjReferencia}-chart-${wChartObjNome}']`);

            wCtxNovo = new Chart(wCtx, wOptions)
            wCtxNovo.canvas.parentNode.style.height = parseInt(wChtRowspan.replace(/[^0-9]/g, '')) - 10 + "px";
            wCtxNovo.resize()


        })



        console.log("wObjReferencia ", wObjReferencia)
        console.log("wJsonPrps")
        console.log(wJsonPrps)
    }

}

var _ccRpt = new _ccaseReport();



var _ccCht = new _ccaseChart();







fLimpaFiltroDataTable = function fLimpaFiltroDataTable() {
    /* RESET FILTER */
    wDataRows
        .search('')
        .columns().search('')
        .draw();

    /* APLICA FILTRO FLUTUANTE */
    $(".column_filter").change();
}

getRows = function getRows(pColNomeGroup, pObjReferencia, wMColsListagem, pWhere) {

    /* LIMPA FILTO */
    fLimpaFiltroDataTable();
    /* WHERE */
    /* WHERE */
    if (pWhere) {
        var wWhere = pWhere.split(",")
        wWhere.forEach(filtro => {
            wWhereFiltro = filtro.split("=") // 0-COLUNA; 1-VALOR;
            wColunaPos = $("th[data-col-nome='" + wWhereFiltro[0] + "']").attr("data-index-coluna")
            var wRegEx = "^" + wWhereFiltro[1] + "$"
            $('[name="dashbord-data-result"]').DataTable().column(wColunaPos).search(
                    wRegEx, true, false, true    
            ).draw();
        });
    }


    var wRows = wDataRows.rows({ search: 'applied' }).data(),
        wColuna = $("th[data-col-nome='" + pColNomeGroup + "']").attr("data-index-coluna"),
        wDataGroupBy = fGroupBy(wRows, parseInt(wColuna)),
        wObjReferencia = _cc.string.valor(pObjReferencia, 1),
        wDataNames = Object.getOwnPropertyNames(wDataGroupBy),
        wHtml = ``,
        wTHead = ``,
        wTBody = ``,
        wMData = [],
        wMLabels = [],
        wMBgChart = []


    if (wMColsListagem) {
        /* THEAD */
        for (let wIdx = 0; wIdx < wMColsListagem.length; wIdx++) {
            const wColunaListagem = wMColsListagem[wIdx];
            wTHead += `<th>${wJsonColunas[wColunaListagem].titulo}</th>`
        }

        /* TBODY */
        for (let wIdx = 0; wIdx < wRows.length; wIdx++) {
            wTBody += `<tr>`
            for (let wIdx2 = 0; wIdx2 < wMColsListagem.length; wIdx2++) {
                wTBody += `<td>${wRows[wIdx][$("th[data-col-nome='" + wMColsListagem[wIdx2] + "']").attr("data-index-coluna")]}</td>`
            }
            wTBody += `</tr>`
        }
    } else {
        /* THEAD */
        wTHead += `
            <tr>
                <th>DESCRICAO</th>
                <th>QTD</th>
            </tr>
        `
            /* TBODY */
        for (let wIdx = 0; wIdx < wDataNames.length; wIdx++) {
            const wItem = wDataNames[wIdx];
            wTBody += `
                    <tr>
                        <td>${wItem}</td>
                        <td>${wDataGroupBy[wItem].length}</td>
                    </tr>
            `
            wMLabels.push(wItem)
            wMData.push(wDataGroupBy[wItem].length)
            wMBgChart.push("rgba(230,153," + Math.floor(Math.random() * (100 - 5 + 1) + 5)) + ")";

        }
    }

    wHtml = `
        <div class=""  style="width:50%;float:left;margin-left:5px;margin-right:5px">
            <table  class="table" id="${wObjReferencia}-table" name="${wObjReferencia}-table" class="display" style="width:100%">
                <thead class="" style="color: white;background: #FF9900 !important;opacity: 0.8;">
                    ${wTHead}
                </thead>
                <tbody name="tbody">
                    ${wTBody}
                </tbody>
            </table>
        </div>
        <div class="" style="width:40%;float:left;margin-left:5px;margin-right:5px">
                <div name="${wObjReferencia}-table-chart"></div>
        </div>
        `

    $(`[name='${wObjReferencia}']`).html(wHtml)
    $(`[name='${wObjReferencia}-table']`).DataTable();


    if (!wMColsListagem) {

        $(`[name="${wObjReferencia}-table-chart"]`).html('<canvas name="' + wObjReferencia + '-canvas-dashbord"></canvas>');

        wCht = $("[name='" + wObjReferencia + "-canvas-dashbord']")

        var wOptions = {
            type: "pie",
            data: {
                labels: wMLabels,
                datasets: [{
                    label: wMLabels,
                    data: wMData,
                    backgroundColor: wMBgChart,
                    borderWidth: 2
                }]
            }
        }
        myChart = new Chart(wCht, wOptions)
    }
}

//getRows("cnProduto", "", ["cnPaciente", "nmPaciente", "cnProduto"])



function fRichard() {





    var wJsn = `{
        obj : '${_ccCD1(encodeURI("tk=" + cc.global.token + "&tabela=" + "shcPaciente" + "&colunas=" + "cnPaciente,nmPaciente,cnConvenio.nmFantasia,cnReligiao.nmReligiao,caEndRegiao.nmRegiao" + "&limit=20"), +1, 10, 0, 0, 1)}'
    }`;

    wInpIdAjx = _cc.ajax(cc.url.ccasegd + "/wsTB2", "post", "application/json", wJsn);
    wInpIdAjx.then((result) => {
        var wData = result.data;
        var wTBody = ''
        var wNames = Object.getOwnPropertyNames(wData[0])
        for (let wIdx = 0; wIdx < wData.length; wIdx++) {
            wTBody += "<tr>"
            for (let wIdx2 = 0; wIdx2 < wNames.length; wIdx2++) {
                wTBody += "<td>" + wData[wIdx][wNames[wIdx2]] + "</td>"
            }
            wTBody += "</tr>"
        }
        var wHtml = `

    <div class="cc-col col-5">
        <div>
            <label>Prontuario</label>
            <input type="text" data-column="0" class="form-control column_filter"
                id="col0_filter">
        </div>
    </div>
    <div class="cc-col col-5">
        <div>
            <label>Paciente</label>
            <input type="text" data-column="1" class="form-control column_filter"
                id="col1_filter">
        </div>
    </div>
    <div class="cc-col col-5">
        <div>
            <label for="">Convenio</label>
            <input type="text" data-column="2" class="form-control column_filter"
                id="col2_filter">
            <!--
                <select type="text" data-column="2" class="form-control column_filter" id="col2_filter">
                    <option value="">SELECIONE</option>
                    <option value="F">FEMININO</option>
                    <option value="M">MASCULINO</option>
                </select>
            -->
        </div>
    </div>
    <div class="cc-col cc-col-36">
        <table id="example" class="table">
        <thead class="" style="color: white;background: #FF9900 !important;opacity: 0.8;">
                <tr>
                    <th scope="col">Código do Paciente</th>
                    <th scope="col">Nome do Paciente</th>
                    <th scope="col">Convênio</th>
                    <th scope="col">ReligiÃ£o</th>
                    <th scope="col">Região</th>
                </tr>
            </thead>
            <tbody>
                ${wTBody}
            </tbody>
        </table>
    </div>
    
    <script>
            window.wDataRows = $('#example').DataTable();
            $('.column_filter').on('change keyup click', function() {
                filterColumn($(this).attr('data-column'));
            });
            //getRows()
            
            
    </script>
        `

        $("[name='dashbord-data']").html(wHtml)

    }).catch((err) => {
        console.log(err)
    });


}

/* FUNCTION GROUPBY */
var fGroupBy = function(pMObject, pKeyIten) {
    return pMObject.reduce(function(wObject, wRowLine) {
        (wObject[wRowLine[pKeyIten]] = wObject[wRowLine[pKeyIten]] || []).push(wRowLine);
        return wObject;
    }, {});
};

function filterColumn(i) {
    $('#example').DataTable().column(i).search(
        $('#col' + i + '_filter').val()
    ).draw();
}


var wJsonColunas = {
    cnPaciente: {
        imprime: true,
        titulo: "Cód. Paciente"
    },
    nmPaciente: {
        imprime: true,
        filtro: true,
        titulo: "Nome do Paciente"
    },
    cnPacienteSTS: {
        imprime: true,
        titulo: "Cód. Status do Paciente"
    },
    anPacienteSTS: {
        imprime: true,
        filtro: true,
        titulo: "Status do Paciente"
    },
    cnEmpresa: {
        imprime: true,
        titulo: "Filial"
    },
    cnConvenio: {
        imprime: true,
        titulo: "Cód. Convênio"
    },
    nmConvenio: {
        imprime: true,
        filtro: true,
        titulo: "Convênio"
    },
    anEndereco: {
        imprime: true,
        titulo: "Endereço Completo"
    },
    dcSexo: {
        imprime: true,
        filtro: true,
        colspan: 10,
        titulo: "Sexo"
    },
    nrFaixaEtaria: {
        imprime: true,
        titulo: "Faixa Etária"
    },
    nrIdade: {
        imprime: true,
        titulo: "Idade"
    },
    dtPacienteNasc: {
        imprime: false,
        titulo: "Data de Nascimento"
    },
    cnProduto: {
        imprime: true,
        filtro: true,
        titulo: "Cód. Produto"
    },
    anProduto: {
        imprime: true,
        titulo: "Produto"
    },
    cnOrcamento: {
        imprime: true,
        titulo: "Cód. Orçamento"
    },
    cnOrcamentoSTS: {
        imprime: true,
        titulo: "Cód. Status do Orçamento"
    },
    anOrcamentoSTS: {
        imprime: false,
        titulo: "Status do Orçamento"
    },
    dtOrcamentoIni: {
        imprime: true,
        titulo: "Início do Orçamento"
    },
    dtOrcamentoFim: {
        imprime: true,
        titulo: "Final do Orçamento"
    },
    lsEquipamentos: {
        imprime: true,
        titulo: "Equipamentos"
    },
    lsMatmeds: {
        imprime: true,
        titulo: "Matmeds"
    },
    lsProcedimentos: {
        imprime: true,
        titulo: "Procedimentos"
    },
    anEndLatitude: {
        imprime: false,
        titulo: "Latitude"
    },
    anEndLongitude: {
        imprime: false,
        titulo: "Longitude"
    },
    caRegiao: {
        imprime: false,
        titulo: "Cód. Região"
    },
    nmRegiao: {
        imprime: true,
        titulo: "Região"
    },
    dmTipoSTS: {
        imprime: true,
        titulo: "Tipo de Status"
    },
    caCID: {
        imprime: false,
        titulo: "CID do Paciente"
    }

}


$(document).off('click', "[name='data-btn-filtrar-paciente']");
$(document).on('click', "[name='data-btn-filtrar-paciente']", function(e) {
    fCriaDashbordData()

})

async function fCriaDashbordData() {
    var wJsn = "{"
    wJsn += "   \"token\" : \"" + cc.global.token + "\","
    wJsn += "   \"urlCcaseGd\" : \"" + cc.url.ccasegd + "\","
    wJsn += "   \"session\" : \"" + cc.global.session + "\","
    wJsn += "   \"dtini\" : \"" + $('[name="filter-paciente-data-ini"]').val() + "\","
    wJsn += "   \"dtfim\" : \"" + $('[name="filter-paciente-data-fim"]').val() + "\","
    wJsn += "   \"cnfilial\" : \"\","
    wJsn += "   \"cnproduto\" : \"\","
    wJsn += "   \"cnconvenio\" : \"2,3\","
    wJsn += "   \"cnstatus\" : \"\""
    wJsn += "}";


    /* URI DA API NODE */
    var wRest = cc.url.cnodejs + "collection.body/collection.dashbord/paciente_detalhes"


    /* AJAX  */
    var wTableHtml = await $.ajax({
        type: "post",
        url: wRest,
        data: wJsn
    }).then((res) => {
        var wData = res.data;
        var wMColunas = Object.getOwnPropertyNames(wJsonColunas);
        var wTheadHtml = "",
            wTbodyHtml = "",
            wIdxColuna = 0,
            wFilterHtml = "";

        /* THEAD/TFOOD */
        for (let wIndex = 0; wIndex < wMColunas.length; wIndex++) {
            const wPrpColuna = wJsonColunas[wMColunas[wIndex]];
            if (wPrpColuna.filtro == true) {

                wFilterHtml += `
                <div class="cc-col cc-col-${wPrpColuna.colspan || 5}">
                    <div>
                        <label>${wPrpColuna.titulo}</label>
                        <input type="text" data-column="${wIdxColuna}" class="form-control column_filter"
                            id="col${wIdxColuna}_filter">
                    </div>
                </div>
                `
            }

            if (wPrpColuna.imprime == true) {
                wTheadHtml += `<th class="cc-report-titulo"data-index-coluna='${wIdxColuna}' data-col-nome='${wMColunas[wIndex]}'>${wJsonColunas[wMColunas[wIndex]]["titulo"]}</th>`
                wIdxColuna++;
            }
        }

        /* TBODY */
        for (let wIndexX = 0; wIndexX < wData.length; wIndexX++) {
            const wRowLine = wData[wIndexX];
            wTbodyHtml += `<tr>`
            for (let wIndexY = 0; wIndexY < wMColunas.length; wIndexY++) {

                const wPrpColuna = wJsonColunas[wMColunas[wIndexY]];
                if (wPrpColuna.imprime == true) {
                    wTbodyHtml += `<td data-col-nome='${wMColunas[wIndexY]}'>${wRowLine[wMColunas[wIndexY]]}</td>`
                }
            }
            wTbodyHtml += `</tr>`
        }

        $("[name='filtro-lateral']").html('<div class="cc-col cc-col-36">' + wFilterHtml + '</div>')
        wHtml = `

                <div class="cc-col cc-col-36">
                    <div class="table-responsive">
                        <table class="table" id="dashbord-data-result" name="dashbord-data-result">
                            <thead style="border-radius:0.8rem ;background: #FF9900 !important;color: white;">
                            <tr>
                                ${wTheadHtml}
                            </tr>
                            </thead>
                            <tbody>
                                ${wTbodyHtml}
                            </tbody>
                        <table> 
                    </div>    
                </div>    
                    <script>
                    window.wDataRows = $("[name='dashbord-data-result']").DataTable();
                    $('.column_filter').on('change keyup click', function() {
                        /* FILTRA COLUNA */
                        wDataRows.column($(this).attr('data-column')).search(
                            $('#col' + $(this).attr('data-column') + '_filter').val()
                        ).draw();
                    });
            </script>
        `

        $("[name='dashbord-data']").html(wHtml)
    }).catch((err) => {
        console.log(err)
    });
}
//fCriaDashbordData()