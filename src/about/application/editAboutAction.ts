import About from '@/about/domain/about'

async function execute(command) {
  const existingAbout = await About.findOne({}).exec()
  if (existingAbout) {
    if(command.text) existingAbout.text = command.text
    if (command.picture) existingAbout.picture = command.picture
    await existingAbout.save()
  } else {
    const aboutData = { text: command.text, picture: command.picture }
    const aboutToAdd = new About(aboutData)
    await aboutToAdd.save()
  }
}

const editAboutAction = {
  execute
}

export { editAboutAction }
