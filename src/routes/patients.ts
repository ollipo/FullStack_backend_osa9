import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toEntries } from '../utils';
import {v1 as uuid} from 'uuid';
const id = uuid();

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getWithoutSsnEntries());
});

router.get('/:id', (req, res) => {
  const result = patientService.findPatient(req.params.id);
      if (result) {
        res.json(result);
      } else {
        res.status(404).end(); 
      }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
  
    const addedEntry = patientService.addEntry(newPatientEntry);
  res.json(addedEntry);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
}
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newBody = {
      id: id,
      ...req.body
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = toEntries(newBody);
    patientService.addEntries(entry, req.params.id);
  res.json(entry);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
}
});

export default router;