export interface ContactInformation {
  phoneNumbers: {
    main: Number,
    mobile: Number
  },
  emails: Array<String>,
  weekdaysInformation: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
  }
}

export class NoContactInformation implements ContactInformation {
  phoneNumbers: {
    main: Number
    mobile: Number
  }
  emails: Array<String>
  weekdaysInformation: {
    monday: String
    tuesday: String
    wednesday: String
    thursday: String
    friday: String
    saturday: String
  }
}
