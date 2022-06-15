import React, { FC } from 'react'
import ConferenceCard from './ConferenceCard'

interface Props {
    city: string,
    conferences: any[],
}

const ConferenceSection: FC<Props> = ({ city, conferences }) => {
    console.log(conferences)
  return (
      <div className="conference-section">
          <div className="conference-section-title">
            <h2>EVENTOS EN <b>{city.toUpperCase()} ({conferences.length})</b></h2>    
          </div>
          <div className="conference-section-content">
        {conferences.map((conference, i) => <ConferenceCard key={i} id={conference._id} {...conference}/>)}
          </div>
    </div>
  )
}

export default ConferenceSection