import { Grid, Stack, Tab, Tabs, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import API from '../apis'
import ClincianDetails from '../components/ClincianDetails'
import Page from '../components/Page'
import PatientDetails from '../components/PatientDetails'
import Patients from '../components/Patients'

type Patient = {
  id: string
  name: string
}

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [openedPatients, setOpenedPatients] = useState<Patient[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState<boolean>()
  const [value, setValue] = useState(0)

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const { patients: _patients } = await API.GET.patients()
      setLoading(false)
      setPatients(_patients)
    } catch (error: any) {
      setLoading(false)
      alert(error.message)
    }
  }
  useEffect(() => {
    fetchPatients()
  }, [])

  const handleChange = (event: any, newValue: any) => {
    setPatient(openedPatients[newValue - 1])
    setValue(newValue)
  }
  const onSelect = (_patient: Patient) => {
    const list = openedPatients.filter((item) => item.id !== _patient.id)
    list.push(_patient)

    setOpenedPatients(list)
    setPatient(_patient)
    setValue(list.length)
  }
  const onClose = (_patient: Patient) => {
    const list = openedPatients.filter((item) => item.id !== _patient.id)
    setOpenedPatients(list)
    setPatient(list[value - 2])
    setValue(value - 1)
  }

  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-around'>
            <Stack>
              <Typography variant='h4'>Clinical Portal</Typography>
            </Stack>
            <Stack>
              <ClincianDetails />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='patients' value={0} />
            {openedPatients.map((patient, i) => {
              return <Tab label={patient.name} key={patient.id} value={i + 1} />
            })}
          </Tabs>
          {!patient && <Patients patients={patients} onSelect={onSelect} />}
          {patient && <PatientDetails patient={patient} onClose={onClose} />}
        </Grid>
      </Grid>
    </Page>
  )
}
export default Dashboard
