import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ThemeChanger from '../theme/ThemeChanger'
import { loadConferences } from '../lib/conferences/conferences'
import ConferenceSection from '../components/Conferences/ConferenceSection'

interface Props {
  conferences: any[]
}

const Home: NextPage<Props> = ({conferences}) => {
  console.log(conferences)
  return (
    <div className='home'>
      <ThemeChanger />
      <ConferenceSection/>
    </div>
  )
}

export async function getStaticProps() {
  const conferences = await loadConferences()
  return {
    props: {
      conferences:conferences
    }
  }
}

export default Home
