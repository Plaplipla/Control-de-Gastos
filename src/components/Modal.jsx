import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg' // "../" 2 puntos xqe hay que salir de modal para entrar a img

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {                               //Se va a ejecutar cuando el componente esté listo
      if( Object.keys(gastoEditar).length > 0 ) {
        setNombre(gastoEditar.nombre)               //Si 'gastoEditar' viene vacío entonces es un registro nuevo (al pasar un objeto vacío), pero si viene con algo entonces estamos editando
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }                                     
    }, [])

    const ocultarModal = () => {            //Para cerrar la pantalla modal en caso de que el presupuesto sea válido
        setAnimarModal(false)               //al definirlo, con una pequeña animacion predefinida para medio seg
        setGastoEditar({})                  //Resetear el state al finalizar un gasto editado
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();                 //En caso de que algun campo este vacio => setMensaje correspondiente

        if([ nombre, cantidad, categoria ].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})        //=> Objeto
    }

    return (
        <div className="modal">
            <div className="cerrar-modal"> 
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>  

                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Añade el Nombre del Gasto"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>

                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Añade la Cantidad del Gasto: ej. 300"
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>
                
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    <select
                        id="categoría"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input //boton que envía...
                    type="submit" 
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />

            </form>
        </div>
    )}

export default Modal
