export interface ContactInformation {
  phoneNumbers: {
    main: Number,
    mobile: Number
  },
  emails: Array<string>,
  weekdaysInformation: {
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
  }
}

export class NoContactInformation implements ContactInformation {
  phoneNumbers: {
    main: Number
    mobile: Number
  }
  emails: Array<string>
  weekdaysInformation: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
  }

  constructor() {
    this.phoneNumbers = { main: 0, mobile: 0 }
    this.emails = []
    this.weekdaysInformation = {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: ''
    }
  }
}
