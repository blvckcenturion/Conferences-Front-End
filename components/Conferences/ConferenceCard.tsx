import {FC} from 'react'
import { useRouter } from 'next/router'

interface Props {
  id: string,
  image: string,
  name: string,
  startDate: string,
  presenters: string[],
  isProfile?: boolean,
  isEdit?: boolean,

}

const ConferenceCard : FC<Props> = ({image, name, startDate, presenters, id, isProfile, isEdit}) => {
  const router = useRouter()
  const date = new Date(startDate)
  const day = date.getDate()+1
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const handleClick = () => {
    if (isEdit) {
      router.push(`/edit/${id}`)
    } else {
      router.push(`/conference/${id}`)
    }
  }
  return (
    <div className="conference-card">
      <div className="conference-card-img">
        <img src={image} alt={name}/>
      </div>
      <div className='conference-card-details'>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <p>{`${day}/${month}/${year}`}</p>
          <p>{`Por: ${presenters[0]} ${presenters.length > 1 ? `y ${presenters.length-1}+` : ''}`}</p>
        </div>
      </div>
      {(<button className='conference-card-button' onClick={handleClick}>
        {isProfile ? isEdit ? 'Editar Conferencia' : 'Ver Conferencia' : 'Quiero Inscribirme'}
      </button>) }
    </div>
  )
}

export default ConferenceCard