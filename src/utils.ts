import { Discharge, Entry, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatientEntry, OccupationalHealthcareEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing comment');
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing comment');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing comment');
    }
    return occupation;
};

const isDischarge = (param: any): param is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = isString(param.date) && isString(param.criteria);
  if (!result) {
    throw new Error('Incorrect or missing discharge');
  }
  return result;
};

const parseDischarge = (discharge: unknown): Discharge => {
  console.log('discharge');
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing comment');
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };
  
  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  /* const isDiagnosisCodes = (param: any): param is DiagnoseEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(DiagnoseEntry).includes(param);
  }; */

  /* const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<DiagnoseEntry> => {
    if (!diagnosisCodes) {
        throw new Error('Incorrect or missing gender: ' + diagnosisCodes);
    }
    return diagnosisCodes;
  }; */

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const HCR = Object.values(HealthCheckRating).includes(param);
      if (!HCR) {
        throw new Error('Incorrect or missing hcr: ' + HCR);
    }
    return HCR;
  };

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing gender: ' + healthCheckRating);
    }
    return healthCheckRating;
  };

  const parseHealthCheckType = (healthCheckType: unknown): "HealthCheck" => {
    if (!healthCheckType || !(healthCheckType==="HealthCheck")) {
        throw new Error('Incorrect or missing gender: ' + healthCheckType);
    }
    return healthCheckType;
  };

  const parseOccupationalHealthcareType = (occupationalHealthcareType: unknown): "OccupationalHealthcare" => {
    if (!occupationalHealthcareType || !(occupationalHealthcareType==="OccupationalHealthcare")) {
        throw new Error('Incorrect or missing gender: ' + occupationalHealthcareType);
    }
    return occupationalHealthcareType;
  };

  const parseHospitalType = (hospitalType: unknown): "Hospital" => {
    if (!hospitalType || !(hospitalType==="Hospital")) {
        throw new Error('Incorrect or missing gender: ' + hospitalType);
    }
    return hospitalType;
  };

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

/* type BaseEntryFields = { description : unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown };

export const toBaseEntries = ({ description, date, specialist, diagnosisCodes } : BaseEntryFields): NewBaseEntryFields => {
  const newBaseEntryFields: NewBaseEntryFields = {
    description: parseName(description),
    date: parseName(date),
    specialist: parseName(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  };

  return newBaseEntryFields;
}; */

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toEntries = (entry : Entry): Entry => {
  switch(entry.type) {
    case "HealthCheck":
      const healthCheckEntryFields: HealthCheckEntry = {
        id: parseName(entry.id),
        type: parseHealthCheckType(entry.type),
        description: parseName(entry.description),
        date: parseName(entry.date),
        specialist: parseName(entry.specialist),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
        return healthCheckEntryFields;                
    case "OccupationalHealthcare":
      const occupationalHealthcareEntryFields: OccupationalHealthcareEntry = {
        id: parseName(entry.id),
        type: parseOccupationalHealthcareType(entry.type),
        description: parseName(entry.description),
        date: parseName(entry.date),
        specialist: parseName(entry.specialist),
        employerName: parseName(entry.employerName)
      };
        return occupationalHealthcareEntryFields; 
    case "Hospital":
      const hospitalEntryFields: HospitalEntry = {
        id: parseName(entry.id),
        type: parseHospitalType(entry.type),
        description: parseName(entry.description),
        date: parseName(entry.date),
        specialist: parseName(entry.specialist),
        discharge: parseDischarge(entry.discharge)
      };
        return hospitalEntryFields; 
    default:
        return assertNever(entry);
  }
};

export default toNewPatientEntry;