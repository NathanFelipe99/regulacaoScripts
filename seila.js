wHtml += `<h4 style="background: lightgrey;margin-top: 5px;padding: 5px;border-radius: 5px;" name="anPergunta" for="${
  wScriptItem.cnRegulacaoScript
}-${wScriptItem.csRegulacaoScriptItem}">${wScriptItem.anInteracaoTexto} ${
  wScriptItem.boRequerido ? '<sup class="text-danger">*</sup>' : ""
}</h4>`;
