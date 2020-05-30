export interface ContactInformation {
  phoneNumbers: {
    main: number,
    mobile: number
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
    main: number
    mobile: number
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
}
