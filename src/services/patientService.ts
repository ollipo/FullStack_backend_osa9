import patients from '../../data/patients';
import { PatientEntry, WithoutSsnPatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getWithoutSsnEntries = (): WithoutSsnPatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
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

export default {
  getEntries,
  getWithoutSsnEntries,
  addEntry
};