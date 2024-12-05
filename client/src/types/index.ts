// ===============================
// Enums
// ===============================
export enum SizeOfEmployers {
  "Less-than-17" = "Less-than-17",
  "20-50" = "20-50",
  "50-100" = "50-100",
  "100-250" = "100-250",
  "250-500" = "250-500",
  "500-1000" = "500-1000",
}

export enum ApplicationStatus {
  Rejected = "Rejected",
  Pending = "Pending",
  Accepted = "Accepted",
  Interview = "Interview",
}

export enum TypeOfAccount {
  Seeker = "seeker",
  Employer = "employer",
  Default = "",
}

// ===============================
// Types
// ===============================
export type EmployerTypes = {
  _id: string;
  image: string;
  industry: string;
  companyDescription: string;
  size: keyof typeof SizeOfEmployers;
  website: string;
  address: string;
  number: number;
  email: string;
  name: string;
  password: string;
  jobs: JobTypes[];
  followers: SeekerTypes[];
};

export type JobTypes = {
  title: string;
  position: "Remote" | "On-Site" | "Hybrid";
  location: string;
  type: "Internship" | "Full-Time" | "Part-Time" | "Freelance";
  skills: string[];
  level: "Junior" | "Medior" | "Senior";
  salary: number;
  _id: string;
  expiration_date: string & Date;
  description: string;
  overview: string;
  createdAt: string;
  applications: ApplicationsTypes[];
  company: EmployerTypes;
};

export type JobAlertsTypes = {
  title: string;
  type: string;
  level: string;
};

export type EducationTypes = {
  _id: string;
  institution: string;
  graduationDate: string;
  fieldOfStudy: string;
  degree: string;
};

export type ExperienceTypes = {
  _id: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  level: string;
  type: string;
  location: string;
  position: string;
  isCurrentlyWorking: boolean;
};

export type SeekerTypes = {
  _id: string;
  biography: string;
  image: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  portfolio: string;
  linkedin: string;
  github: string;
  resume?: string;
  role: string;
  receiveJobAlerts: boolean;
  headline: string;
  skills: string[];
  following: string[];
  savedJobs: JobTypes[];
  applications: ApplicationsTypes[];
  education: EducationTypes[];
  experience: ExperienceTypes[];
  alerts: JobAlertsTypes;
  createdAt: Date;
  updatedAt: Date;
};

export type ApplicationsTypes = {
  _id: string;
  status: keyof typeof ApplicationStatus;
  cover_letter: string;
  resume: string;
  seeker: SeekerTypes;
  job: JobTypes;
  createdAt: string;
};

export type FilterCounts = {
  [key: string]: {
    _id: string;
    count: number;
  }[];
}[];

export type FilterGroup = {
  id: string;
  title: string;
  data: {
    id: string;
    title: string;
    value: string;
    type: string;
    count?: number;
  }[];
};
