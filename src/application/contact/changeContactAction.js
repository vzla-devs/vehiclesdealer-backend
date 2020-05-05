import Contact from '@/domain/models/contact'

async function execute(command) {
  const existingContact = await Contact.findOne({}).exec()
  if(!existingContact) {
    const contactToAdd = new Contact ({
      mobilePhone: command.mobilePhone,
      mainPhone: command.mainPhone,
      emails: command.emails,
      monday: command.monday,
      tuesday: command.tuesday,
      wednesday: command.wednesday,
      thursday: command.thursday,
      friday: command.friday,
      saturday: command.saturday
    })
    await contactToAdd.save()
  } else {
    existingContact.mobilePhone = command.mobilePhone
    existingContact.mainPhone = command.mainPhone
    existingContact.emails = command.emails
    existingContact.monday = command.monday
    existingContact.tuesday = command.tuesday
    existingContact.wednesday = command.wednesday
    existingContact.thursday = command.thursday
    existingContact.friday = command.friday
    existingContact.saturday = command.saturday
    await existingContact.save()
  }
}

const changeContactAction = {
  execute
}

export { changeContactAction }
