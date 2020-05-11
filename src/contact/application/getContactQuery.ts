import Contact from '@/contact/domain/contact'

async function get() {
  const contact = await Contact.findOne({}).exec()
  return contact
}

const getContactQuery = {
  get
}

export { getContactQuery }
