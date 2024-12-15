/**
 * Enum representing the position type for a job.
 * Example: Remote, On-Site, Hybrid
 */
export enum JobPosition {
  Remote = 'Remote',
  OnSite = 'On-Site',
  Hybrid = 'Hybrid',
}

/**
 * Enum defining the type of employment for a job.
 * Example: Internship, Full-Time, Part-Time, Freelance
 */
export enum JobType {
  Internship = 'Internship',
  FullTime = 'Full-Time',
  PartTime = 'Part-Time',
  Freelance = 'Freelance',
}

/**
 * Enum representing the seniority or level of a job position.
 * Example: Junior, Medior, Senior, Lead
 */
export enum JobLevel {
  Junior = 'Junior',
  Medior = 'Medior',
  Senior = 'Senior',
  Lead = 'Lead',
}

/**
 * Enum listing different industries where a company might operate.
 * Example: Technology, Healthcare, Finance
 */
export enum IndustryType {
  Technology = 'technology',
  Healthcare = 'healthcare',
  Finance = 'finance',
  Education = 'education',
  Manufacturing = 'manufacturing',
  Retail = 'retail',
  Hospitality = 'hospitality',
  Automotive = 'automotive',
  Construction = 'construction',
  Media = 'media',
  Marketing = 'marketing',
  Telecommunications = 'telecommunications',
  Government = 'government',
  Nonprofit = 'nonprofit',
  Other = 'other',
}

/**
 * Enum representing the size of a company.
 * Values are based on the number of employees.
 * Example: Less than 17, 20-50, 50-100
 */
export enum CompanySize {
  LessThan17 = 'Less-than-17',
  Between20And50 = '20-50',
  Between50And100 = '50-100',
  Between100And250 = '100-250',
  Between250And500 = '250-500',
  Between500And1000 = '500-1000',
}

/**
 * Enum defining the current status of a job application.
 * Example: Rejected, Pending, Accepted, Interview
 */
export enum ApplicationStatus {
  Rejected = 'Rejected',
  Pending = 'Pending',
  Accepted = 'Accepted',
  Interview = 'Interview',
}

/**
 * Enum for representing the role of a user in the system.
 * Example: Employer, Seeker
 */
export enum Role {
  Employer = 'employer',
  Seeker = 'seeker',
}
