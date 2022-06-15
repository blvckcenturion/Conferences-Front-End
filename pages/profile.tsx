import React from 'react'
import { loadByParticipant, createConference, loadByCreator } from '../lib/conferences/conferences'
import { getUser, getUserToken } from '../lib/user/user'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faBullhorn, faClipboardUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import ConferenceCard from '../components/Conferences/ConferenceCard'

const profile = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>()
  const [tab, setTab] = useState<string>('new')
  useEffect(() => {
    if(!getUserToken()) {
      router.push('/login')
    }
  })

  const renderTab = (tab: string) => { 
    switch (tab) {
      case 'new':
        return <NewConferences setTab={setTab}/>
      case 'created':
        return <CreatedConferences />
      case 'enlisted':
        return <JoinedConferences />
    }

  }

  return (
    <div className='profile'>
      <div className='profile-options'>
        <div>
          <h2>Conferencias</h2>
        </div>
        <div>
          <ProfileOption title="Nueva" icon={faCalendarPlus} tab={'new'} setTab={setTab} />
          <ProfileOption title="Creadas" icon={faBullhorn} tab={'created'} setTab={setTab}/>
          <ProfileOption title="Enlistadas" icon={faClipboardUser} tab={'enlisted'} setTab={setTab}/>
        </div>
      </div>
      <div className='profile-main'>
        {renderTab(tab)}
      </div>
    </div>
  )
}

const ProfileOption = ({title, icon, setTab, tab} : {title: string, icon : IconProp, setTab: Function, tab: string}) => {
  
  return (
    <div className='profile-options-item' onClick={() => setTab(tab)}>
      <FontAwesomeIcon icon={icon} />
      <h4>{title}</h4>
    </div>
  )
}

const NewConferences = ({setTab} : {setTab: Function}) => { 
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [presenters, setPresenters] = useState<string>('')

  const handleSubmit = async (e : any) => {
    e.preventDefault()
    const user = getUser()
    if (!user) return
    const pres = presenters.split(',').map(p => p.trim())
    const response = await createConference({
      name,
      image,
      description,
      address,
      city,
      country,
      startDate,
      endDate,
      presenters: pres
    })
    if (response && response.status >= 200 && response.status < 300) { 
      alert('Conferencia creada')
      setTab('created')
    }
  }

  return (
    <div className="new">
      <form className='form' onSubmit={handleSubmit}>
        <div className="form-heading">
          <h2>Nueva Conferencia.</h2>
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
          <button>
             Crear Conferencia    
          </button>
        </div>
      </form>
    </div>
  )
}

const CreatedConferences = () => { 
  const [conferences, setConferences] = useState<any>([])
  useEffect(() => { 
    (async () => {
      const user = await getUser()
      if(user) {
        const conferences = await loadByCreator()
        setConferences(conferences)
        console.log(conferences)
      }
    })()
  },[])

  return (
    <div className="created">
      <div>
        <h2>Conferencias Creadas.</h2>
      </div>
      <div>
        {conferences && conferences.length > 0 && (
          <div className='joined-grid'>
            {conferences.map((conference: any, id: number) => <ConferenceCard {...conference} key={id} id={conference._id} isProfile={true} isEdit={true} />)}
          </div>
        )}
        {conferences && conferences.length === 0 && (
          <div className='joined-no-results'>
            <h2>No tienes conferencias creadas.</h2>
          </div>
        )}
      </div>
    </div>
  )
}

const JoinedConferences = () => { 
  const [conferences, setConferences] = useState<any>()
  useEffect(() => {
    (async () => {
      const user = await getUser()
      if(user) {
        const conferences = await loadByParticipant()
        setConferences(conferences)
      }
    })()
  }, [])
  return (
    <div className="joined">
      <div>
        <h2>Conferencias Enlistadas.</h2>
      </div>
      <div>
        {conferences && conferences.length > 0 && (
          <div className='joined-grid'>
            {conferences.map((conference: any, id: number) => <ConferenceCard {...conference} key={id} id={conference._id} isProfile={true} />)}
          </div>
        )}
        {conferences && conferences.length === 0 && (
          <div className='joined-no-results'>
            <h2>No tienes conferencias enlistadas.</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default profile