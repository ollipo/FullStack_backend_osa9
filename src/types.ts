export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface Discharge {
    date: string,
    criteria: string
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
      }
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge
}

export type WithoutSsnPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export type EntryWithoutId = 
  | HospitalEntryWithoutId
  | OccupationalHealthcareEntryWithoutId
  | HealthCheckEntryWithoutId;

export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, 'id' >;

export type OccupationalHealthcareEntryWithoutId = Omit<OccupationalHealthcareEntry, 'id' >;

export type HospitalEntryWithoutId = Omit<HospitalEntry, 'id' >;