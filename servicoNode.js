async function paciente(pBody) {
    try {
        /* BODY PARSE */
        var wBody = JSON.parse(pBody);
        var wColuna = wBody["coluna"];
        var wToken = wBody["token"]
        var wUrl = wBody["urlCcaseGd"]
        /* SELECT */
        var wSelect = ""
        wSelect += "{"
        wSelect += "\"sql\" :"
        wSelect += "\""
        wSelect += "SELECT 8578 AS ativo, 2982 AS inativo"
        wSelect += "\""
        wSelect += "}";

        //wRest = "https://dese.gestaoci.com.br/cCaseGD/tabela2?tabela=see_sequencia&tk="+wToken+""

        wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""

        options = {
            method: "POST",
            enconding: "utf8",
            url: wRest,
            body: wSelect,
            json: true
        };
        /* EXECUTA AJAX */
        return await cNodeAjax(JSON.stringify(options)).then((jsonResp) => { return jsonResp; });

    } catch (error) {
        return {
            "cnRetorno": 1,
            "data": [],
            "anErro": error.toString(),
            "anObs": "Retorno collection.ccase",
        }
    }

}


async function pacientePorConvenio(pBody) {
    try {
        /* BODY PARSE */
        var wBody = JSON.parse(pBody);
        var wColuna = wBody["coluna"];
        var wToken = wBody["token"]
        var wUrl = wBody["urlCcaseGd"]
        /* SELECT */
        var wSelect = ""
        wSelect += "{"
        wSelect += "\"sql\" :"
        wSelect += "\""
wSelect += "SELECT * "
wSelect += "  FROM ("
wSelect += "        SELECT a.cnv_codigo, b.cnv_desc"
wSelect += "               ,CASE WHEN wQtdMonth > 0 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 0 MONTH),'%m%Y') END AS '00x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 0 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 0 MONTH)) then 1 END) AS '00n'"
wSelect += "               ,CASE WHEN wQtdMonth > 0 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 1 MONTH),'%m%Y') END AS '01x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 1 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 1 MONTH)) then 1 END) AS '01n'"
wSelect += "               ,CASE WHEN wQtdMonth > 1 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 2 MONTH),'%m%Y') END AS '02x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 2 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 2 MONTH)) then 1 END) AS '02n'"
wSelect += "               ,CASE WHEN wQtdMonth > 2 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 3 MONTH),'%m%Y') END AS '03x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 3 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 3 MONTH)) then 1 END) AS '03n'"
wSelect += "               ,CASE WHEN wQtdMonth > 3 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 4 MONTH),'%m%Y') END AS '04x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 4 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 4 MONTH)) then 1 END) AS '04n'"
wSelect += "               ,CASE WHEN wQtdMonth > 4 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 5 MONTH),'%m%Y') END AS '05x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 5 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 5 MONTH)) then 1 END) AS '05n'"
wSelect += "               ,CASE WHEN wQtdMonth > 5 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 6 MONTH),'%m%Y') END AS '06x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 6 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 6 MONTH)) then 1 END) AS '06n'"
wSelect += "               ,CASE WHEN wQtdMonth > 6 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 7 MONTH),'%m%Y') END AS '07x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 7 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 7 MONTH)) then 1 END) AS '07n'"
wSelect += "               ,CASE WHEN wQtdMonth > 7 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 8 MONTH),'%m%Y') END AS '08x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 8 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 8 MONTH)) then 1 END) AS '08n'"
wSelect += "               ,CASE WHEN wQtdMonth > 8 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 9 MONTH),'%m%Y') END AS '09x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 9 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 9 MONTH)) then 1 END) AS '09n'"
wSelect += "               ,CASE WHEN wQtdMonth > 9 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 10 MONTH),'%m%Y') END AS '10x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 10 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 10 MONTH)) then 1 END) AS '10n'"
wSelect += "               ,CASE WHEN wQtdMonth > 10 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 11 MONTH),'%m%Y') END AS '11x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 11 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 11 MONTH)) then 1 END) AS '11n'"
wSelect += "               ,CASE WHEN wQtdMonth > 11 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 12 MONTH),'%m%Y') END AS '12x'"
wSelect += "               ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 12 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 12 MONTH)) then 1 END) AS '12n'"
wSelect += "               ,SUM(1) AS QtdGeral"
wSelect += "          FROM see_orcamento a"
wSelect += "               INNER JOIN see_convenio b ON b.cnv_codigo = a.cnv_codigo"
wSelect += "               INNER JOIN (SELECT '2020-01-01' AS wData, TIMESTAMPDIFF(MONTH,'2020-01-01','2020-07-01') AS wQtdMonth) x ON 1=1"
wSelect += "         WHERE a.orc_status = '3' "
wSelect += "           AND DATE_FORMAT(a.orc_data,'%Y-%m') >= '2020-01'"
wSelect += "           AND DATE_FORMAT(a.orc_data,'%Y-%m') <= '2020-07'"
wSelect += "         GROUP BY a.cnv_codigo"
wSelect += "         ORDER BY QtdGeral"
wSelect += "       ) x "
wSelect += " UNION ALL "
wSelect += " SELECT 0, 'Total Geral' "
wSelect += "       ,CASE WHEN wQtdMonth > 0 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 0 MONTH),'%m%Y') END AS '00x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 0 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 0 MONTH)) then 1 END) AS '00n'"
wSelect += "       ,CASE WHEN wQtdMonth > 0 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 1 MONTH),'%m%Y') END AS '01x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 1 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 1 MONTH)) then 1 END) AS '01n'"
wSelect += "       ,CASE WHEN wQtdMonth > 1 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 2 MONTH),'%m%Y') END AS '02x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 2 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 2 MONTH)) then 1 END) AS '02n'"
wSelect += "       ,CASE WHEN wQtdMonth > 2 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 3 MONTH),'%m%Y') END AS '03x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 3 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 3 MONTH)) then 1 END) AS '03n'"
wSelect += "       ,CASE WHEN wQtdMonth > 3 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 4 MONTH),'%m%Y') END AS '04x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 4 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 4 MONTH)) then 1 END) AS '04n'"
wSelect += "       ,CASE WHEN wQtdMonth > 4 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 5 MONTH),'%m%Y') END AS '05x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 5 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 5 MONTH)) then 1 END) AS '05n'"
wSelect += "       ,CASE WHEN wQtdMonth > 5 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 6 MONTH),'%m%Y') END AS '06x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 6 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 6 MONTH)) then 1 END) AS '06n'"
wSelect += "       ,CASE WHEN wQtdMonth > 6 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 7 MONTH),'%m%Y') END AS '07x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 7 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 7 MONTH)) then 1 END) AS '07n'"
wSelect += "       ,CASE WHEN wQtdMonth > 7 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 8 MONTH),'%m%Y') END AS '08x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 8 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 8 MONTH)) then 1 END) AS '08n'"
wSelect += "       ,CASE WHEN wQtdMonth > 8 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 9 MONTH),'%m%Y') END AS '09x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 9 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 9 MONTH)) then 1 END) AS '09n'"
wSelect += "       ,CASE WHEN wQtdMonth > 9 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 10 MONTH),'%m%Y') END AS '10x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 10 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 10 MONTH)) then 1 END) AS '10n'"
wSelect += "       ,CASE WHEN wQtdMonth > 10 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 11 MONTH),'%m%Y') END AS '11x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 11 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 11 MONTH)) then 1 END) AS '11n'"
wSelect += "       ,CASE WHEN wQtdMonth > 11 then DATE_FORMAT(DATE_ADD(wData, INTERVAL 12 MONTH),'%m%Y') END AS '12x'"
wSelect += "       ,SUM(CASE WHEN Year(a.orc_data) = Year(DATE_ADD(wData, INTERVAL 12 MONTH)) AND month(a.orc_data) = month(DATE_ADD(wData, INTERVAL 12 MONTH)) then 1 END) AS '12n'"
wSelect += "       ,SUM(1) AS QtdGeral"
wSelect += "  FROM see_orcamento a"
wSelect += "       INNER JOIN see_convenio b ON b.cnv_codigo = a.cnv_codigo"
wSelect += "       INNER JOIN (SELECT '2020-01-01' AS wData, TIMESTAMPDIFF(MONTH,'2020-01-01','2020-07-01') AS wQtdMonth) x ON 1=1"
wSelect += " WHERE a.orc_status = '3' "
wSelect += "   AND DATE_FORMAT(a.orc_data,'%Y-%m') >= '2020-01'"
wSelect += "   AND DATE_FORMAT(a.orc_data,'%Y-%m') <= '2020-07'"
        wSelect += "\""
        wSelect += "}";

     //return { "wTeste": wSelect }

        //wRest = "https://dese.gestaoci.com.br/cCaseGD/tabela2?tabela=see_sequencia&tk="+wToken+""

        wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""

        options = {
            method: "POST",
            enconding: "utf8",
            url: wRest,
            body: wSelect,
            json: true
        };
        /* EXECUTA AJAX */
        return await cNodeAjax(JSON.stringify(options)).then((jsonResp) => { return jsonResp; });

    } catch (error) {
        return {
            "cnRetorno": 1,
            "data": [],
            "anErro": error.toString(),
            "anObs": "Retorno collection.ccase",
        }
    }
}

async function paciente_detalhesold(pBody) {

    var wdata = {
        "cnRetorno": 0,
        "data": []
    };

    try {
        /* BODY PARSE */
        var wBody = JSON.parse(pBody);
        var wColuna = wBody["coluna"];
        var wToken = wBody["token"]
        var wUrl = wBody["urlCcaseGd"]
        
        var wfilial = wBody["cnfilial"]; // Codigo da Filial
        var wproduto = wBody["cnproduto"]; // Codigo do Produto
        var wcnconvenio = wBody["cnconvenio"]; // Codigo do Convenio
        var wdtini = moment(wBody["dtini"], 'DD/MM/YYYY').format('YYYY-MM-DD');  // Periodo do Orçamento - Inicio
        var wdtfim = moment(wBody["dtfim"], 'DD/MM/YYYY').format('YYYY-MM-DD');  // Período do Orçamento - Fim      
        var wstatus = wBody["cnstatus"]; 
        var wfaixaetaria = wBody["cnfaixaetaria"]; 
        var wmatmed = wBody["cnmatmed"]; 
        var wprocedimento = wBody["cnprocedimento"];
        var wequipamento = wBody["cnequipamento"]; 
        

     //   if (!moment(wBody["dtini"]).isValid()){
      if (!wBody["dtini"]){
           return {
              "cnRetorno": 1,
              "data": [],
              "anErro": "Data Inicial inválida",
              "anObs": "Retorno collection.dashbord"
           };
        };   
  
    //    if (!moment(wBody["dtfim"]).isValid()){  
      if (!wBody["dtfim"]){
           return {
              "cnRetorno": 1,
              "data": [],
              "anErro": "Data Final Inválida",
              "anObs": "Retorno collection.dashbord"
           };
        };   
        
        
        /* SELECT */
        var wSelect = ""
        wSelect += "{"
        wSelect += "\"sql\" :"
        wSelect += "\""

        wSelect += " SELECT x.* "
        wSelect += " ,case when x.idade > 90 then 9  "
        wSelect += "       when x.idade > 80 then 8  "
        wSelect += "       when x.idade > 70 then 7  "
        wSelect += "       when x.idade > 60 then 6  "
        wSelect += "       when x.idade > 50 then 5  "
        wSelect += "       when x.idade > 40 then 4  "
        wSelect += "       when x.idade > 30 then 3  "
        wSelect += "       when x.idade > 20 then 2  "
        wSelect += "       when x.idade > 10 then 1  "
        wSelect += "       else 0  "
        wSelect += "       END as faixa_etaria  "
        wSelect += " FROM ( "
        wSelect += " SELECT  "
        wSelect += "  a.pac_codigo "
        wSelect += " ,a.pac_nome "
        wSelect += " ,a.sts_codigo "
        wSelect += " ,s.sts_desc "
        wSelect += " ,o.prod_codigo "
        wSelect += " ,p.prod_nome "

        wSelect += " ,concat(ifnull(a.pac_end,'') "
        wSelect += " ,',',ifnull(a.pac_num,'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_comp),'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_bairro),'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_cid),'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_uf),'')) anendereco "


        wSelect += " ,o.cnv_codigo "
        wSelect += " ,c.cnv_desc "
        wSelect += " ,o.orc_codigo "
        wSelect += " ,DATE_FORMAT(o.orc_data,'%d/%m/%Y') as orc_data "
        wSelect += " ,DATE_FORMAT(o.orc_data_validade,'%d/%m/%Y') as orc_data_validade "
        wSelect += " ,o.orc_status "
        wSelect += " , case when o.orc_status = 1 then 'Aberto' "
        wSelect += "        when o.orc_status = 2 then 'Recusado' "
        wSelect += " 		 when o.orc_status = 3 then 'Aprovado' "
        wSelect += " 		 when o.orc_status = 4 then 'Reaberto' "
        wSelect += " 		 when o.orc_status = 5 then 'Avaliações' "
        wSelect += " 		 when o.orc_status = 6 then 'Perdas' "
        wSelect += " 		 when o.orc_status = 7 then 'Aval.WEB' "
        wSelect += " 		 ELSE 'NA' END AS orc_status_dsc "
        wSelect += " ,o.orc_filial "
        wSelect += " ,DATE_FORMAT(a.pac_dtnasc,'%d/%m/%Y') as pac_dtnasc "
        wSelect += " ,round((Datediff(curdate(),a.pac_dtnasc)/365),0) as idade  "
        wSelect += " ,a.pac_sex "
        wSelect += " from see_paciente a  "
        wSelect += " INNER JOIN see_orcamento o ON o.pac_codigo = a.pac_codigo "
        wSelect += " INNER JOIN see_convenio c ON c.cnv_codigo = a.cnv_codigo "
        wSelect += " INNER JOIN see_status s ON s.sts_codigo = a.sts_codigo  "
        wSelect += " INNER JOIN see_produto p ON p.prod_codigo = o.prod_codigo "

        wSelect += " WHERE (o.orc_data BETWEEN '"+wdtini+"' AND '"+wdtfim+"'"
        wSelect += "   OR o.orc_data_validade BETWEEN '"+wdtini+"' AND '"+wdtfim+"')"
    //    wSelect += " AND a.pac_codigo IN (64513) "        

        if (wfilial){wSelect += "  AND o.orc_filial in ("+wfilial+")"}      
        if (wcnconvenio){wSelect += " AND o.cnv_codigo in ("+wcnconvenio+")"}
        if (wproduto){wSelect += " AND o.prod_codigo in ("+wproduto+")"}        
        if (wstatus){wSelect += " AND a.sts_codigo in ("+wstatus+")"}        
  
        wSelect += " ) x "

        wSelect += "\""
        wSelect += "}";

        wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""

        options = {
            method: "POST",
            enconding: "utf8",
            url: wRest,
            body: wSelect,
            json: true
        };
        /* EXECUTA AJAX */
      //  return await cNodeAjax(JSON.stringify(options)).then((jsonResp) => { return jsonResp; });
        return await cNodeAjax(JSON.stringify(options)).then((jsonResp) => {
        if (jsonResp.cnRetorno != 0) {
            return jsonResp;
        } else {      

            for (let wIdx = 0; wIdx < jsonResp.data.length; wIdx++) {
               const wRow = jsonResp.data[wIdx];
               wdata.data.push({
                  "cnconvenio"        :wRow["cnv_codigo"       ],
                  "anconvenio"          :wRow["cnv_desc"         ],
                  "nmfaixa_etaria"      :wRow["faixa_etaria"     ],
                  "nmidade"             :wRow["idade"            ],
                  "anendereco"         :wRow["anendereco"            ],
                  "cnorcamento"        :wRow["orc_codigo"       ],
                  "dtorcamentoini"          :wRow["orc_data"         ],
                  "dtorcamentofim" :wRow["orc_data_validade"],
                  "cnfilial"        :wRow["orc_filial"       ],
                  "cnorcamentostatus"        :wRow["orc_status"       ],
                  "anorcamentostatus"    :wRow["orc_status_dsc"   ],
                  "cnpaciente"        :wRow["pac_codigo"       ],
                  "dtpacientenasc"        :wRow["pac_dtnasc"       ],
                  "anpacientenome"          :wRow["pac_nome"         ],
                  "casexo"           :wRow["pac_sex"          ],
                  "cnproduto"       :wRow["prod_codigo"      ],
                  "anproduto"         :wRow["prod_nome"        ],
                  "cnpacientestatus"        :wRow["sts_codigo"       ],
                  "anpacientestatus"          :wRow["sts_desc"         ],
                  "matmeds"           :[],
                  "procedimentos"     :[],
                  "equipamentos"      :[]
               });                          
            }; // for
            return wdata;             
        };
        });

    } catch (error) {
        return {
            "cnRetorno": 1,
            "data": [],
            "anErro": error.toString(),
            "anObs": "Retorno collection.dashbord"
        }
    }
}


async function paciente_detalhes(pBody) {

    var wdata = {
        "cnRetorno": 0,
        "data": []
    };

    try {
        /* BODY PARSE */
        var wBody = JSON.parse(pBody);
        var wColuna = wBody["coluna"];
        var wToken = wBody["token"]
        var wUrl = wBody["urlCcaseGd"]
        
        var wfilial = wBody["cnfilial"]; // Codigo da Filial
        var wproduto = wBody["cnproduto"]; // Codigo do Produto
        var wcnconvenio = wBody["cnconvenio"]; // Codigo do Convenio
        var wdtini = moment(wBody["dtini"], 'DD/MM/YYYY').format('YYYY-MM-DD');  // Periodo do Orçamento - Inicio
        var wdtfim = moment(wBody["dtfim"], 'DD/MM/YYYY').format('YYYY-MM-DD');  // Período do Orçamento - Fim      
        var wstatus = wBody["cnstatus"]; 
        var wfaixaetaria = wBody["cnfaixaetaria"]; 
        var wmatmed = wBody["cnmatmed"]; 
        var wprocedimento = wBody["cnprocedimento"];
        var wequipamento = wBody["cnequipamento"];
        

     //   if (!moment(wBody["dtini"]).isValid()){
      if (!wBody["dtini"]){
           return {
              "cnRetorno": 1,
              "data": [],
              "anErro": "Data Inicial inválida",
              "anObs": "Retorno collection.dashbord"
           };
        };   
  
    //    if (!moment(wBody["dtfim"]).isValid()){  
      if (!wBody["dtfim"]){
           return {
              "cnRetorno": 1,
              "data": [],
              "anErro": "Data Final Inválida",
              "anObs": "Retorno collection.dashbord"
           };
        };   
        
        
        /* SELECT */
        var wSelect = ""
        wSelect += "{"
        wSelect += "\"sql\" :"
        wSelect += "\""

        wSelect += " SELECT x.* "
        wSelect += " ,case when x.idade > 90 then 9  "
        wSelect += "       when x.idade > 80 then 8  "
        wSelect += "       when x.idade > 70 then 7  "
        wSelect += "       when x.idade > 60 then 6  "
        wSelect += "       when x.idade > 50 then 5  "
        wSelect += "       when x.idade > 40 then 4  "
        wSelect += "       when x.idade > 30 then 3  "
        wSelect += "       when x.idade > 20 then 2  "
        wSelect += "       when x.idade > 10 then 1  "
        wSelect += "       else 0  "
        wSelect += "       END as faixa_etaria  "
        wSelect += " FROM ( "
        wSelect += " SELECT  "
        wSelect += "  a.pac_codigo "
        wSelect += " ,a.pac_nome "
        wSelect += " ,a.sts_codigo "
        wSelect += " ,s.sts_desc "
        wSelect += " ,o.prod_codigo "
        wSelect += " ,p.prod_nome "

        wSelect += " ,concat(ifnull(a.pac_end,'') "
        wSelect += " ,',',ifnull(a.pac_num,'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_comp),'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_bairro),'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_cid),'') "
        wSelect += " ,ifnull(concat(' - ',a.pac_uf),'')) anendereco "


        wSelect += " ,o.cnv_codigo "
        wSelect += " ,c.cnv_desc "
        wSelect += " ,o.orc_codigo "
        wSelect += " ,DATE_FORMAT(o.orc_data,'%d/%m/%Y') as orc_data "
        wSelect += " ,DATE_FORMAT(o.orc_data_validade,'%d/%m/%Y') as orc_data_validade "
        wSelect += " ,o.orc_status "
        wSelect += " , case when o.orc_status = 1 then 'Aberto' "
        wSelect += "        when o.orc_status = 2 then 'Recusado' "
        wSelect += " 		 when o.orc_status = 3 then 'Aprovado' "
        wSelect += " 		 when o.orc_status = 4 then 'Reaberto' "
        wSelect += " 		 when o.orc_status = 5 then 'Avaliações' "
        wSelect += " 		 when o.orc_status = 6 then 'Perdas' "
        wSelect += " 		 when o.orc_status = 7 then 'Aval.WEB' "
        wSelect += " 		 ELSE 'NA' END AS orc_status_dsc "
        wSelect += " ,o.orc_filial "
        wSelect += " ,o.pac_zona "
        wSelect += " ,r.regiao_desc "
        wSelect += " ,DATE_FORMAT(a.pac_dtnasc,'%d/%m/%Y') as pac_dtnasc "
        wSelect += " ,round((Datediff(curdate(),a.pac_dtnasc)/365),0) as idade  "
        wSelect += " ,a.pac_sex "
        wSelect += " from see_paciente a  "
        wSelect += " INNER JOIN see_orcamento o ON o.pac_codigo = a.pac_codigo "
        wSelect += " INNER JOIN see_convenio c ON c.cnv_codigo = a.cnv_codigo "
        wSelect += " INNER JOIN see_status s ON s.sts_codigo = a.sts_codigo  "
        wSelect += " INNER JOIN see_produto p ON p.prod_codigo = o.prod_codigo "
        wSelect += " INNER JOIN see_regiao r ON r.regiao_cod = o.pac_zona "

        wSelect += " WHERE (o.orc_data BETWEEN '"+wdtini+"' AND '"+wdtfim+"'"
        wSelect += "   OR o.orc_data_validade BETWEEN '"+wdtini+"' AND '"+wdtfim+"')"
    //    wSelect += " AND a.pac_codigo IN (64513) "        

        if (wfilial){wSelect += "  AND o.orc_filial in ("+wfilial+")"}      
        if (wcnconvenio){wSelect += " AND o.cnv_codigo in ("+wcnconvenio+")"}
        if (wproduto){wSelect += " AND o.prod_codigo in ("+wproduto+")"}        
        if (wstatus){wSelect += " AND a.sts_codigo in ("+wstatus+")"}        
  
        wSelect += " ) x "

        wSelect += "\""
        wSelect += "}";


        wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""

        options = {
            method: "POST",
            enconding: "utf8",
            url: wRest,
            body: wSelect,
            json: true
        };
        /* EXECUTA AJAX */
      //  return await cNodeAjax(JSON.stringify(options)).then((jsonResp) => { return jsonResp; });
        return await cNodeAjax(JSON.stringify(options)).then(async(jsonResp) => {
        if (jsonResp.cnRetorno != 0) {
            return jsonResp;
        } else {      

            for (let wIdx = 0; wIdx < jsonResp.data.length; wIdx++) {
               const wRow = jsonResp.data[wIdx];
               wdata.data.push({
                  "cnPaciente":wRow["pac_codigo"],
                  "nmPaciente":wRow["pac_nome"],
                  "cnPacienteSTS":wRow["sts_codigo"],
                  "anPacienteSTS":wRow["sts_desc"],
                  "cnEmpresa":wRow["orc_filial"],
                  "cnConvenio":wRow["cnv_codigo"],
                  "nmConvenio":wRow["cnv_desc"],
                  "anEndereco":wRow["anendereco"],
                  "dcSexo":wRow["pac_sex"],
                  "nrFaixaEtaria":wRow["faixa_etaria"],
                  "nrIdade":wRow["idade"],
                  "caRegiao": wRow["pac_zona"],
                  "nmRegiao":wRow["regiao_desc"],
                  "cnProduto":wRow["prod_codigo"],
                  "anProduto":wRow["prod_nome"],
                  "cnOrcamento":wRow["orc_codigo"],
                  "cnOrcamentoSTS":wRow["orc_status"],
                  "dtOrcamentoIni":wRow["orc_data"],
                  "dtOrcamentoFim":wRow["orc_data_validade"],
//                  "anorcamentostatus"    :wRow["orc_status_dsc"   ],
//                  "dtpacientenasc"        :wRow["pac_dtnasc"       ],
                  "lsEquipamentos"      :[],
                  "lsMatmeds"           :[],
                  "lsProcedimentos"     :[]
               });   
               
               
//               /* SELECT - CONSULTA MATMEDS*/
//               
//               var wSelect = ""
//               wSelect += "{"
//               wSelect += "\"sql\" :"
//               wSelect += "\""
//               
//               wSelect += " SELECT "
//               wSelect += " orcm_item "
//               wSelect += " ,mat_tipo "
//               wSelect += " ,mat_codigo "
//               wSelect += " ,orcm_qtd "
//               wSelect += " ,orcm_vl_unitario "
//               wSelect += " ,orcm_vl_total "
//               wSelect += " FROM see_orcamento_matmed "
//               wSelect += " WHERE orc_codigo = "+wRow["orc_codigo"]
//               
//               wSelect += "\""
//               wSelect += "}";
//               
//               
//               wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""
//               
//               options = {
//                   method: "POST",
//                   enconding: "utf8",
//                   url: wRest,
//                   body: wSelect,
//                   json: true
//               };
//               await cNodeAjax(JSON.stringify(options)).then(async(jsonResp1) => {
//               if (jsonResp1.cnRetorno != 0) {
//                  return jsonResp1;	 
//               } else {      
//                   for (let wIdx1 = 0; wIdx1 < jsonResp1.data.length; wIdx1++) {
//                      const wRow1 = jsonResp1.data[wIdx1];
//                      wdata.data[wIdx].lsmatmeds.push({
//                         "orcm_item"       :wRow1["orcm_item"       ],
//                         "mat_tipo"        :wRow1["mat_tipo"        ],
//                         "mat_codigo"      :wRow1["mat_codigo"      ],
//                         "orcm_qtd"        :wRow1["orcm_qtd"        ],
//                         "orcm_vl_unitario":wRow1["orcm_vl_unitario"],
//                         "orcm_vl_total"   :wRow1["orcm_vl_total"   ]            
//                      });   
//                   }; // for
//               };
//               });
//               
//               // FIM CONSULTA MATMEDS
//
//               /* SELECT - CONSULTA PROCEDIMENTOS*/
//               
//               var wSelect = ""
//               wSelect += "{"
//               wSelect += "\"sql\" :"
//               wSelect += "\""
//               
//               wSelect += " SELECT orcp_item "
//               wSelect += " ,prc_tabela "
//               wSelect += " ,prc_codigo "
//               wSelect += " ,orcp_qtd "
//               wSelect += " ,orcp_vl_unitario "
//               wSelect += " ,orcp_vl_total "
//               wSelect += " FROM see_orcamento_procedimento"
//               wSelect += " WHERE orc_codigo = "+wRow["orc_codigo"]
//               
//               wSelect += "\""
//               wSelect += "}";
//               
//               
//               wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""
//               
//               options = {
//                   method: "POST",
//                   enconding: "utf8",
//                   url: wRest,
//                   body: wSelect,
//                   json: true
//               };
//               await cNodeAjax(JSON.stringify(options)).then(async(jsonResp1) => {
//               if (jsonResp1.cnRetorno != 0) {
//                  return jsonResp1;	 
//               } else {      
//                   for (let wIdx1 = 0; wIdx1 < jsonResp1.data.length; wIdx1++) {
//                      const wRow1 = jsonResp1.data[wIdx1];
//                      wdata.data[wIdx].lsprocedimentos.push({
//                         "orcp_item"       :wRow1["orcp_item"       ],
//                         "prc_tabela"      :wRow1["prc_tabela"      ],
//                         "prc_codigo"      :wRow1["prc_codigo"      ],
//                         "orcp_qtd"        :wRow1["orcp_qtd"        ],
//                         "orcp_vl_unitario":wRow1["orcp_vl_unitario"],
//                         "orcp_vl_total"   :wRow1["orcp_vl_total"   ]                   	
//                      });   
//                   }; // for
//               };
//               });
//               
//               // FIM CONSULTA PROCEDIMENTOS
//
//               /* SELECT - CONSULTA EQUIPAMENTOS*/
//               
//               var wSelect = ""
//               wSelect += "{"
//               wSelect += "\"sql\" :"
//               wSelect += "\""
//               
//               wSelect += " SELECT orce_item "
//               wSelect += " ,for_codigo "
//               wSelect += " ,equi_codigo "
//               wSelect += " ,orce_qtd "
//               wSelect += " ,orce_vl_unitario "
//               wSelect += " ,orce_vl_total "
//               wSelect += " FROM see_orcamento_equipamentos "
//               wSelect += " WHERE orc_codigo = "+wRow["orc_codigo"]
//               
//               wSelect += "\""
//               wSelect += "}";
//               
//               
//               wRest = wUrl + "tabela2?tabela=see_sequencia&tk=" + wToken + ""
//               
//               options = {
//                   method: "POST",
//                   enconding: "utf8",
//                   url: wRest,
//                   body: wSelect,
//                   json: true
//               };
//               await cNodeAjax(JSON.stringify(options)).then(async(jsonResp1) => {
//               if (jsonResp1.cnRetorno != 0) {
//                  return jsonResp1;	 
//               } else {      
//                   for (let wIdx1 = 0; wIdx1 < jsonResp1.data.length; wIdx1++) {
//                      const wRow1 = jsonResp1.data[wIdx1];
//                      wdata.data[wIdx].lsequipamentos.push({
//                         "orce_item"       :wRow1["orce_item"       ],
//                         "for_codigo"      :wRow1["for_codigo"      ],
//                         "equi_codigo"     :wRow1["equi_codigo"     ],
//                         "orce_qtd"        :wRow1["orce_qtd"        ],
//                         "orce_vl_unitario":wRow1["orce_vl_unitario"],
//                         "orce_vl_total"   :wRow1["orce_vl_total"   ]                      	
//                      });   
//                   }; // for
//               };
//               });
//               
//               // FIM CONSULTA EQUIPAMENTOS
               
               
                                      
            }; // for
            return wdata;             
        };
        });

    } catch (error) {
        return {
            "cnRetorno": 1,
            "data": [],
            "anErro": error.toString(),
            "anObs": "Retorno collection.dashbord"
        }
    }
}