import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
        gastos,
        setGastos,
        presupuesto,
        setPresupuesto,
        setIsValidPresupuesto
    }) => {

    const [porcentaje, setPorcentaje] = useState(0)

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);     //reduce = acumulador
      //total = 0, gasto [{gasto1.cantidad=5000, gato2.cantidad=20}]  gato.cantidad + total 
      //5000+0 = 5000, 20+5000 = 5020 => totalGastado
      
      const totalDisponible = presupuesto - totalGastado;

      //Calcular el porcentaje gastado
      const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

      setDisponible(totalDisponible)
      setGastado(totalGastado)

      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
      }, 1500);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)      //en esta parte reinicia la pagina al confirmar el reseteo y te dewelve a la pagina inicial(modal)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                  pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',    //Si el % es mayor a 100 => rojo, caso contrario => azul
                  trailColor: '#F5F5F5',
                  textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
          <button
              className="reset-app"
              type="button"
              onClick={handleResetApp}
          >
              Resetear App
          </button>
          <p> 
            <span>Presupuesto: </span>{formatearCantidad(presupuesto)}     
          </p>

          <p className={`${disponible < 0 ? 'negativo' : '' }`}>
            <span>Disponible: </span>{formatearCantidad(disponible)}
          </p>

          <p>
            <span>Gastado: </span>{formatearCantidad(gastado)}
          </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
