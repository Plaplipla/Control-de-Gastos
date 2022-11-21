import React from 'react'
import Gasto from './Gasto'     //listado gasto esta en la misma carpeta que gasto => "./"

const ListadoGastos = ({
    gastos,
    setGastoEditar,
    eliminarGasto,
    filtro,
    gastosFiltrados
}) => {           //aqui se quiere mostrar el gasto de forma condicional
    return (
        <div className='listado-gastos contenedor'>

        
            { filtro ? (            //si filtro existe ? entonces vamos a iterar sobre los gastos filtrados
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
                        {gastosFiltrados.map( gasto => (          //volver a señalar que es código de JS con '{}'
                            <Gasto 
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}     
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                        {gastos.map( gasto => (                  //el map se ejecuta 1 vez x cada elemento,
                            <Gasto                               //al no haber nada, no se ejecuta ninguna vez
                                key={gasto.id}                   //regla de los componentes: nombrarlos con mayúscula
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos