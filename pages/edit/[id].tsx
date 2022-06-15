import { useState } from 'react'
import { loadConference, loadParticipants, editConference, deleteConference } from '../../lib/conferences/conferences'
import { useRouter } from 'next/router'

const Edit = (props: any) => {
    const router = useRouter()
    const eDate = new Date(props.endDate)
    const sDate = new Date(props.startDate)
    console.log(props.participants)
    const [city, setCity] = useState<string>(props.city)
    const [country, setCountry] = useState<string>(props.country)
    const [address, setAddress] = useState<string>(props.address)
    const [startDate, setStartDate] = useState<string>(`${sDate.getFullYear()}-${sDate.getMonth()+1 < 10 ? `0${sDate.getMonth()+1}` : sDate.getMonth()+1}-${sDate.getDate()+1 < 10 ? `0${sDate.getDate()+1}` : sDate.getDate()+1}`)
    const [endDate, setEndDate] = useState(`${eDate.getFullYear()}-${eDate.getMonth()+1 < 10 ? `0${eDate.getMonth()+1}` : eDate.getMonth()+1}-${eDate.getDate()+1 < 10 ? `0${eDate.getDate()+1}` : eDate.getDate()+1}`)
    const [description, setDescription] = useState<string>(props.description)
    const [name, setName] = useState<string>(props.name)
    const [image, setImage] = useState<string>(props.image)
    const [presenters, setPresenters] = useState<string>(props.presenters.join(', '))

    const handleEdit = async (e: any) => {
        e.preventDefault()
        const response = await editConference(props._id, {
            name,
            image,
            description,
            address,
            city,
            country,
            startDate,
            endDate,
            presenters: presenters.split(',').map(p => p.trim())
        })
        if (response && response.status >= 200 && response.status < 300) {
            alert('Conferencia editada')
            router.push('/profile')
        }
    }

    const handleDelete = async (e: any) => { 
        e.preventDefault()
        const response = await deleteConference(props._id)
        if (response) {
            alert('Conferencia eliminada')
            router.push('/profile')
        }
    }
  return (
      <div className='edit'>
          {props.participants && props.participants.length > 0 && (
              <div className="edit-list">
                  <div className='edit-list-heading'>
                      <h2>Lista de Participantes.</h2>
                  </div>
                  <div className='edit-list-table'>
                      <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                          <tbody>
                              {props.participants.map((p: any) => (
                                  <tr key={p._id}>
                                      <td>{`${p.firstName} ${p.lastName}`}</td>
                                      <td>{p.email}</td>
                                      <td>{p.phone}</td>
                                  </tr>
                              ))}
                            </tbody>
                      </table>
                  </div>
              </div>
          )}
          {props.participants && props.participants.length === 0 && (
              <div className="edit-list">
                <h2>No hay participantes</h2>
                </div>
            )}
            
          <div className='edit-form'>
            <form className='form'>
                <div className="form-heading">
                    <h2>Editar Conferencia.</h2>
                  </div>
                  <div className="form-body">
                    <div className="form-input">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="description">Descripcion</label>
                        <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="image">Imagen</label>
                        <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="presenters">Oradores</label>
                        <input type="text" id="presenters" name="presenters" value={presenters} onChange={(e) => setPresenters(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="address">Direccion</label>
                        <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" id="city" name="city" value={city}  onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="country">Pais</label>
                        <input type="text" id="country" name="country" value={ country} onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                    <div className="form-input">
                            <label htmlFor="startDate">Fecha Inicio</label>
                        <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="form-input">
                            <label htmlFor="endDate">Fecha Fin</label>
                        <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    </div>
                    <div className="form-action">
                        <button onClick={handleEdit}>
                            Actualizar Conferencia.
                        </button>
                        <button onClick={handleDelete}>
                          Eliminar Conferencia.
                        </button>
                    </div>
            </form>
          </div>
    </div>
  )
}
Edit.getInitialProps = async (ctx: any) => { 
    const { id } = ctx.query
    const conference = await loadConference(id)
    const participants = await loadParticipants(id)
    return { ...conference, participants}
}
export default Edit