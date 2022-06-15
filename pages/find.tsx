import {useState} from 'react'
import ConferenceCard from '../components/Conferences/ConferenceCard'
import { loadConferencesByDate } from '../lib/conferences/conferences'
const find = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [conferences, setConferences] = useState([])
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const response = await loadConferencesByDate(startDate, endDate)
    if (response.status >= 200 && response.status < 300) {
      setConferences(response.data)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  return (
    <div className="find">
          <div className='find-title'>
              <h2>Buscar Conferencias</h2>
          </div>
          <div className='find-form'>
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                  <label htmlFor="startDate">Fecha Inicio</label>
                <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-input">
                    <label htmlFor="endDate">Fecha Fin</label>
                <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="form-action">
                <button>
                  Buscar Conferencia
                </button>
              </div>
            </form>
          </div>
        {showResults && conferences && conferences.length > 0 &&(
          <div className='find-results'>
            {conferences.map((e: any, id) => <ConferenceCard id={e._id} {...e} key={id} />)}
          </div>
      )}
      {showResults && conferences && conferences.length === 0 && (<div className='find-no-results'><h2>No se encontraron resultados.</h2></div>)}
      
    </div>
  )
}

export default find