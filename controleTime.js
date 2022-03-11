function ControllTime(){
  var wIncialTime = moment().format('DD/MM/YYYY HH:mm:ss') 

  $(document).on(cc.evento.click, "[data-script-btn-proximo='true']", function() {
    let wEndTime  = moment().format('DD/MM/YYYY HH:mm:ss')

    let wMilSec = moment(wEndTime,"DD/MM/YYYY HH:mm:ss").diff(moment(wIncialTime,"DD/MM/YYYY HH:mm:ss"));
    let wDuration = moment.duration(wMilSec);
    var wSeconds = Math.floor(wDuration.asHours()) + moment.utc(wMilSec).format(":mm:ss");

    

  })  

}


/* TRATAMENTO QUANTIDADE DE MINUTOS ================= NEW =============== */
$(document).on(cc.evento.click, "[data-script-btn-proximo='true']", function() {
  var wIncialTime = moment('11/03/2022 10:25:00').format('DD/MM/YYYY HH:mm:ss') 
  let wQtdMinutosFinal  = moment().format('DD/MM/YYYY HH:mm:ss')

  let wMomentDif = moment(wQtdMinutosFinal,"DD/MM/YYYY HH:mm:ss").diff(moment(wIncialTime,"DD/MM/YYYY HH:mm:ss"));
  let wMilisec = moment.duration(wMomentDif);

  var wTotal = Math.floor(wMilisec.asSeconds());

  console.log(wTotal)

})





let wQtdMinutosFinal  = moment().format('DD/MM/YYYY HH:mm:ss')
    
let wMomentDif = moment(wQtdMinutosFinal,"DD/MM/YYYY HH:mm:ss").diff(moment(wQtdMinutosInicio,"DD/MM/YYYY HH:mm:ss"));
let wMilisec = moment.duration(wMomentDif);

var wTotal = Math.floor(wMilisec.asSeconds());


wJson['anObs'] = wTotal