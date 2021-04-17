import React,{useState} from 'react';
import './App.css';

const  App = () =>  {


  const SetHorarios = () =>{
    let horarios=[];

    for (let hora = 0; hora < 24; hora++) {
      let horario="";
      for (let minutos = 0; minutos < 2; minutos++) {
        if(hora >= 8 && hora < 20)
        {
          horario = `${hora}:${minutos === 0 ? "00" : "30"}-${minutos===0? `${hora}:30`: `${hora+1}:00`}`;
          horarios = [...horarios,horario];
        }
      }
      
    }
    let horariosDisponibles = horarios.filter(horario => horario !== "");
    console.log(horariosDisponibles);
    return horariosDisponibles;
  }
  
  const [motos,SetMotos] = useState(8);
  const [horarios,SetHorariosDisponibles]=useState(SetHorarios());

  const ReservarHorario = (indice,horarioSolicitado) => {


    let horarioReservado = horarioSolicitado.includes("no disponible");
    if(horarioReservado)
    {
      SetMotos(motos + 1);
      let horariosActuales = [...horarios];
      let horariosReserva = SetHorarios();
      let horarioOriginal = horariosReserva[indice];
      horariosActuales[indice] = horarioOriginal;
      SetHorariosDisponibles(horariosActuales);
    }
    else
    {
      if(motos > 0){
        SetMotos(motos - 1 );
        SetHorariosDisponibles(horarios.map(horario => horario === horarioSolicitado ? "no disponible" : horario ));
      }
    }


  }

  const EstaDisponible = (horario) =>{

    let horarioReservado = horario.includes("no disponible");
    let respuesta = horarioReservado ? "celda-reservada": "celda-disponible";

    return respuesta;

  }
  return (
    <div className="App">
      <header className="App-header">
        <h4>
          {motos > 0 ? ` Cantidad motos: ${motos}` : `No hay mas horarios disponibles...`}
        </h4>
        <table class="table">
          <thead className="thead-dark">
            <tr>
              <th className="titulo" scope="col">Horario</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario,i)=>
              {
                return(
                  <tr>
                    <th onClick={() =>ReservarHorario(i,horario)}  className={EstaDisponible(horario)} scope="row">{horario}</th>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

      </header>
    </div>
  );
}

export default App;