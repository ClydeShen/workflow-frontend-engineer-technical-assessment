import { Close } from '@mui/icons-material'
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import API from '../../apis'
type Details = {
  id?: string
  title?: string
  firstName: string
  preferredName?: string
  middleName?: string
  familyName: string
  suffix?: string
  age: number
  sex: 'Male' | 'Female' | 'Unknown' | 'Indeterminate'
}

type Patient = {
  id: string
  name: string
}
type Props = {
  patient?: Patient
  onClose: (_patient: Patient) => void
}
const PatientDetails = (props: Props) => {
  const { onClose, patient } = props
  const [details, setDetails] = useState<Details>()
  const [loading, setLoading] = useState<boolean>()

  const fetchPatientDetails = async (patientId: string) => {
    try {
      setLoading(true)
      const _details = await API.GET.patientDetails(patientId)
      setLoading(false)

      setDetails({ ..._details, id: patientId })
    } catch (error: any) {
      setLoading(false)
      alert(error.message)
    }
  }
  useEffect(() => {
    if (details?.id !== patient!.id) {
      fetchPatientDetails(patient!.id)
    }
  }, [details, patient!.id])
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label='settings' onClick={() => onClose(patient!)}>
            <Close />
          </IconButton>
        }
        title={patient!.id}
      ></CardHeader>
      <CardContent>
        <Stack direction='row' spacing={1}>
          {details?.title && (
            <Typography component='span' variant='subtitle1'>
              {details?.title}
            </Typography>
          )}
          {details?.preferredName ? (
            <Typography component='span' variant='subtitle1'>
              {details?.preferredName}
            </Typography>
          ) : (
            <Typography component='span' variant='subtitle1'>
              {details?.firstName}
            </Typography>
          )}
          {details?.familyName && (
            <Typography component='span' variant='subtitle1'>
              {details?.familyName}
            </Typography>
          )}
          {details?.suffix && (
            <Typography component='span' variant='subtitle1'>
              {details?.suffix}
            </Typography>
          )}
        </Stack>
        <Stack>
          {details?.age && (
            <Typography component='span' variant='subtitle1'>
              {details?.age}
            </Typography>
          )}
          {details?.sex && (
            <Typography component='span' variant='subtitle1'>
              {details?.sex}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
export default PatientDetails
