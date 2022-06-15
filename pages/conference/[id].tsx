import { NextPage } from 'next'
import React from 'react'
import { loadConference, loadConferences } from '../../lib/conferences/conferences'

interface Props {
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


const Conference: NextPage<Props> = ({ image, description, city,country,address,name, startDate, endDate, presenters, addressDetails }) => {
    const sDate = new Date(startDate)
    const eDate = new Date(endDate)
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const startDay = days[sDate.getDay()]
    const startMonth = months[sDate.getMonth()]
    const endDay = days[eDate.getDay()]
    const endMonth = months[eDate.getMonth()]
    const handleInscription = () => {
        console.log('inscribirse')
    }
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
                  <button onClick={handleInscription}>Inscribirse</button>
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