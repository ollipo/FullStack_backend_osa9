import patients from '../../data/patients';
import { PatientEntry, WithoutSsnPatientEntry, NewPatientEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getWithoutSsnEntries = (): WithoutSsnPatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntries = ( entry: Entry, id: string ): PatientEntry | undefined => {
  const patient = findPatient(id);
  if(patient){
    const patientWithNewEntries = {
      ...patient,
      entries: patient.entries.concat(entry)
    };
    return patientWithNewEntries;
  }
  return undefined;
};

const findPatient = (id: string): PatientEntry | undefined => {
  const result = patients.find(p => p.id === id);
  return result;
};

export default {
  getEntries,
  getWithoutSsnEntries,
  addEntry,
  findPatient,
  addEntries
};