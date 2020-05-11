import About from '@/domain/models/about'

async function get () {
  const about = await About.findOne({}).exec()
  return about
}

const getAboutQuery = {
  get
}

export { getAboutQuery }
