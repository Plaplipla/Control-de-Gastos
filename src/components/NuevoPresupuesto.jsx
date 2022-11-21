import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0) {            //si no es un presupuesto valido => setMensaje
            setMensaje('No es un presupuesto válido')    //si es un presupuesto menor que 0 => setMensaje
                                                         //children = mensaje
            return  //aqui se detiene el ciclo de la ejecución del código en caso de que sea válido
        } 
        setMensaje('')
        setIsValidPresupuesto(true)        
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir Presupuesto</label>
                <input 
                    className="nuevo-presupuesto"
                    type="number"                           //no te permite escribir letras
                    placeholder="Añade tu Presupuesto"
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(Number(e.target.value))}
               />
            </div>

            <input type="submit" value="Añadir" />
           
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto