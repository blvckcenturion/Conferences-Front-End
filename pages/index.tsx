import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { loadConferences } from '../lib/conferences/conferences'
import ConferenceSection from '../components/Conferences/ConferenceSection'

interface Props {
  conferences: any[]
}

const Home: NextPage<Props> = ({conferences}) => {
  return (
    <div className='home'>
      {conferences.map((section, i) => <ConferenceSection key={i} {...section}/>)}
    </div>
  )
}

export async function getStaticProps() {
  const conferences = await loadConferences()
  const paths = conferences.map((e: { conferences: any }) => {
    return e.conferences
  }).flat().map((e: { _id: { toString: () => any } }) => {
    return { params: { id: e._id.toString() } }
  })
  console.log(paths)
  return {
    props: {
      conferences
    }
  }
}

export default Home
