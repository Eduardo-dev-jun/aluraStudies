import React, { useState } from 'react';
import Cronometro from '../components/Cronometro';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import { ITarefa } from '../types/tarefa';
import style from './App.module.scss';

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  function selecionaTarefa(tarefaSelecionada: ITarefa){
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.tarefa === tarefaSelecionada.tarefa ? true:false
    })))
  }

  function finalizarTarefa(){
    if(selecionado){
      setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => {
        if(tarefa.tarefa === selecionado.tarefa){
          return {...tarefa, selecionado:false, completado: true}
        }
        else{
          return tarefa;
        }
      }))
    }
  }
  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas}/>
      <Lista tarefas={tarefas} selecionaTarefa={selecionaTarefa}/>
      <Cronometro selecionado={selecionado} finalizarTarefa={finalizarTarefa}></Cronometro>
    </div>
  );
}

export default App;
