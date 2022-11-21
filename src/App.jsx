import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg' // el ./ es para que sea la ubicación actual

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []    //se van a guardar todos los gastos en app.jsx, para poder distribuirlo en los diferentes componentes
  )         //al iniciar, vamos a buscar x 'gastos' si existen en localStorage, lo que haya en LStrge.getItem => pasa a string y si no existe (?) = [arreglo vacío]

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0    //valor inicial = localStorage.getItem, almacenado en 'presupuesto' y si no existe, inicia un 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)   //inicia el false para que no se muestre hasta darle click
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState ('')
  const [gastosFiltrados, setGastosFiltrados] = useState ([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0) {
      setModal(true)
      
  
      setTimeout(() => {
          setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0) //en caso de que no este la variable, se colocará un 0
  }, [presupuesto])   //=> setItem, almacenado en "presupuesto"

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) //JSON.stringify va a convertir un arreglo a un string, en caso contrario entregará un string vacío
  }, [gastos])

  useEffect(() => {
    if(filtro) {      //"si esq filtro existe:v"
        //Filtrar gastos x categoria
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if(presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
        setAnimarModal(true)      //
    }, 500); //500 = 1/2 seg || 1000 = 1 seg
  }
  
  const guardarGasto = gasto => {
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
                                            //Nos va a retornar un nuevo arreglo en nuestra variable(map).
      setGastos(gastosActualizados)         //Cuando el gastoState sea = al gasto que estamos editando 'gasto.id' entonces retorna el 'gasto'(porque será el gasto actualizado),
                                            //caso contrario retorna lo que esté en el State                                         
      setGastoEditar({})                    //Resetear el state al finalizar un gasto editado

    } else {
      // Nuevo Gasto
      gasto.id = generarId();           //se agregan gastos
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)             //para cerrar la modal al generar un nuevo gasto
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)   //va a traer a todos los que son diferentes a la id que le estamos pasando
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : '' }>
      <Header 
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}   //esta es la función que la modifica (todos los 'set-')
      />

      {isValidPresupuesto && (    //solo si es válido se muestra lo demás(el modal)
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos        //mostrar listado de gastos 
               gastos={gastos}
               setGastoEditar={setGastoEditar}
               eliminarGasto={eliminarGasto}
               filtro={filtro}
               gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
              <img 
                  src={IconoNuevoGasto}
                  alt="icono nuevo gasto"   //texto alternativo "(+)"
                  onClick={handleNuevoGasto}
              />
          </div>
        </>
      )}

      {modal && <Modal                  //solo si el componente "modal" se muestra
                  setModal={setModal}
                  animarModal={animarModal}     //se pasa al modal para que sepa cuándo cambió
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}     //se le pasa 'gastoEditar' así la modal sabrá qué gasto e información debe editar
                  setGastoEditar={setGastoEditar}
                />}

    </div>
      
  )
}

export default App
