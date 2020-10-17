setInterval(()=>{
    const date = new Date();
    const dateActual = date.toDateString();
    const dateHoras = date.toLocaleTimeString();
    
    const contentDate =  document.getElementById('date__fecha');
    const contentHoras =  document.getElementById('date__hours');
    contentDate.innerHTML = dateActual;
    contentHoras.innerHTML = dateHoras;
},1000)

  
