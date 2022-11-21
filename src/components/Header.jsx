import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({ 
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto 
}) => {
  return (
      <header>
          <h1>Planificador de Gastos</h1>

          {isValidPresupuesto ? (         //si el presupuesto es válido entonces
              <ControlPresupuesto         //pasará el formulario "control presupuesto" para definirlo
                  gastos={gastos}
                  setGastos={setGastos}
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  setIsValidPresupuesto={setIsValidPresupuesto}
              />
          ) : (                           //si no es válido entonces vamos a definir el nuevo presupuesto
              <NuevoPresupuesto 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
              />
          )}


      </header>
  )
}

export default Header