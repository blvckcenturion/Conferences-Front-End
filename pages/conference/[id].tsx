import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { loadConference, loadConferences, subscribeToConference } from '../../lib/conferences/conferences'
import {getUser} from '../../lib/user/user'
interface Props {
    userId: string,
    name: string,
    image: string,
    startDate: string,
    address: string,
    endDate: string,
    presenters: string[],
    participants: string[],
    country: string,
    city: string,
    description: string,
    addressDetails?: string,
    id: string,
}


const Conference: NextPage<Props> = ({ participants, id, userId, image, description, city,country,address,name, startDate, endDate, presenters, addressDetails }) => {
    const [user, setUser] = useState<any>();
    const sDate = new Date(startDate)
    const eDate = new Date(endDate)
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const startDay = days[sDate.getDay()]
    const startMonth = months[sDate.getMonth()]
    const endDay = days[eDate.getDay()]
    const endMonth = months[eDate.getMonth()]
    const handleInscription = async () => {
        // console.log(id)
        const response = await subscribeToConference(id)
        console.log(response)
    }

    useEffect(() => {
        (async () => {
            const user = await getUser()
            if (user) {
                console.log(participants)
                setUser(user)
            }
        })()
    }, [])

  return (
      <div className="conference">
          <div>
              <div>
                <p>{`INICIO: ${startDay}, ${sDate.getDate()} DE ${startMonth}, ${sDate.getFullYear()}`.toUpperCase()}</p>
                <p>{`FIN: ${endDay}, ${eDate.getDate()} DE ${endMonth}, ${sDate.getFullYear()}`.toUpperCase()}</p>
                <h1>{name}</h1>
                <p>{`${presenters.length > 1 ? 'ORADORES' : 'ORADOR'}: ${presenters.join(', ').toUpperCase()}`}</p>
                <p>{`${city}, ${country}, ${address}${ addressDetails ? ` ${addressDetails}` : ''}`}</p>
              </div>
              <div>
                  <img src={image} alt="" />
              </div>
          </div>
          <div>
              <div>
                  <h3>DESCRIPCION</h3>
                  {user && user.userId !== userId && !participants.flat().includes(user.userId) && <button onClick={handleInscription}>Inscribirse</button>}
                  {user && participants.flat().includes(user.userId) && <button>Ya estas inscrito</button>}
              </div>
              <div>
                  <p>{description}</p>
              </div>
          </div>
      </div>
  )
}

export async function getStaticPaths() {
    const conferences = await loadConferences()
    const paths = conferences.map((e: { conferences: any }) => {
        return e.conferences
      }).flat().map((e: { _id: { toString: () => any } }) => {
        return { params: { id: e._id.toString() } }
      })
    
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({params}: {params: any}) {
    const conference = await loadConference(params.id)
    console.log(conference)
    return {
        props: {
            ...conference, id: params.id
        }
    }
}

export default Conference