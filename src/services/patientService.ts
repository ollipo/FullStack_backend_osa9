import patients from '../../data/patients';
import { PatientEntry, WithoutSsnPatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getWithoutSsnEntries = (): WithoutSsnPatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getWithoutSsnEntries,
  addEntry
};