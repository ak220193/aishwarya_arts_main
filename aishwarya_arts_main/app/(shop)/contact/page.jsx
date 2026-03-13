import React from 'react'
import ContactHeader from '../../components/Contact/ContactHeader'
import ContactInfoCards from '../../components/Contact/ContactInfoCards'
import ContactForm from '../../components/Contact/ContactForm'
import ContactMap from '../../components/Contact/ContactMap'

const page = () => {
  return (
      <div>
      <ContactHeader />
      <ContactForm />
      <ContactInfoCards />
      <ContactMap />
    </div>
  )
}

export default page