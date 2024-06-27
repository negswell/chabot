export enum MessageOwners {
  "USER",
  "BOT",
}

export interface Message {
  owner: MessageOwners;
  msg: string;
  candidates?: Candidates[];
  time: string;
}

export interface Candidates {
  workExperience: WorkExperience[];
  education: Education[];
  location: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  skills_in_context: number;
  workAvailability: string;
  fullTime: number;
  fullTimeSalary: string;
  partTime: number;
  partTimeSalary: string;
  fullTimeAvailability: number;
  partTimeAvailability: number;
}

export interface WorkExperience {
  role: string;
  description: string;
  company: string;
  locationCity: string;
  locationCountry: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  degree: string;
  major: string;
  grade: string;
  school: string;
  endDate: string;
  startDate: string;
}
