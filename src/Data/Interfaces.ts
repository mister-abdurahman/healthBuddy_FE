export interface IAppointment {
  userId: string;
  date: Date | string;
  time: string;
  reason: string;
  doctorId: string;
  doctorName: string;
  completed: boolean;
  vitals: object;
  doctor?: string;
}

export interface IAppointmentForm {
  date: string;
  time: string;
  doctor: string;
  reason: string;
}

export interface IProfileForm {
  phoneNumber: number | null;
  profilePicture: string;
  facebookHandle: string;
  twitterHandle: string;
  linkedInHandle: string;
  address: string;
  state: string;
}

export interface INews {
  title: string;
  text: string;
  date: string;
  link: string;
  image: string;
}
