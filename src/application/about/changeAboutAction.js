import About from '@/domain/models/about'

async function execute(command) {
  const existingAbout = await About.findOne({}).exec()
  if (!!existingAbout) {
    existingAbout.text = command.text
    await existingAbout.save()
  } else {
    const aboutToAdd = new About({ text: command.text })
    await aboutToAdd.save()
  }
}

const changeAboutAction = {
  execute
}

export { changeAboutAction }
