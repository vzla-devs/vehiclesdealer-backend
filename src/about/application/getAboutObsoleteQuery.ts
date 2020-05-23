import About from '@/about/domain/aboutObsoleteModel'

async function get () {
  const about = await About.findOne({}).exec()
  return about
}

const getAboutQuery = {
  get
}

export { getAboutQuery }
