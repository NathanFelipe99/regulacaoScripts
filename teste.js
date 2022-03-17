var wQtdMinutosInicio = moment().format('DD/MM/YYYY HH:mm:ss');
    
function anterior(){    

  let wMilSec = moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(wQtdMinutosInicio, "DD/MM/YYYY HH:mm:ss"));
  let wDuration = moment.duration(wMilSec);
  var wSeconds = Math.floor(wDuration.asHours()) + moment.utc(wMilSec).format("H:mm:ss");
  
  /* === preenchida ao clicar no "botão proximo"  === */
  var proximo  = ccDateTime('19/11/2021 ' + wSeconds);
  console.log(proximo.toString('HH:mm:ss'));


  /* === preenchida ao clicar no "botão anterior" ===  */
  var anterior  = ccDateTime('19/11/2021 ' + wSeconds);
  console.log(proximo.addMilliseconds(wMilSec).toString('HH:mm:ss'))
 
}

anterior()


  
