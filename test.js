console.time("test")

var wJsn = "{"
wJsn += "   \"token\" : \"" + cc.global.token + "\","
wJsn += "   \"urlCcaseGd\" : \"" + cc.url.ccasegd + "\","
wJsn += "   \"session\" : \"" + cc.global.session + "\","
wJsn += "   \"dtini\" : \"01/01/2022\"," 
wJsn += "   \"dtfim\" : \"30/01/2022\","
wJsn += "   \"cnfilial\" : \"\","
wJsn += "   \"cnproduto\" : \"\","
wJsn += "   \"cnconvenio\" : \"\","
wJsn += "   \"cnstatus\" : \"\""
wJsn += "}";


/* URI DA API NODE */
var wRest = cc.url.cnodejs + "collection.body/collection.dashbord/paciente_detalhes"


/* AJAX  */
$.ajax({
    type: "post",
    url: wRest,
    data: wJsn
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
});

console.timeEnd("test")
