import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}
//un alerta de tipo error o correcto(con diferentes estilos) con un mensaje 'children'
//importado en "nuevo presupuesto"
//el tipo es lo que se inyecta dentro de la clase
export default Mensaje

//ctrl + alt + } => ``