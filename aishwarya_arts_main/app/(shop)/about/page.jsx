import React from 'react'

import AboutVideo from '../../components/About/AboutVideo'
import ProfessionalJourney from '../../components/About/ProfessionalJourney'
import MissionVision from '../../components/About/MissionVision'
import WhyChoose from '../../components/About/WhyChoose'
import ContactAnimation from '../../components/About/ContactAnimation'

const page = () => {
  return (
    <main>
      <AboutVideo/>
      <ProfessionalJourney/>
      <MissionVision/>
      <WhyChoose/>
      <ContactAnimation/>
    </main>
  )
}

export default page