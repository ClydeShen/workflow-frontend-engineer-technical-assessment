import { Card, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../../apis'

type Details = {
  username: string
  role: string
  title?: string
  firstName: string
  preferredName?: string
  middleName?: string
  familyName: string
  suffix?: string
}

const ClincianDetails = () => {
  const [details, setDetails] = useState<Details>()
  const [loading, setLoading] = useState<boolean>()
  const fetchClincianDetails = async () => {
    try {
      setLoading(true)
      const result = await API.GET.clinicianDetails()
      setLoading(false)
      setDetails(result)
    } catch (error: any) {
      setLoading(false)
      alert(error.message)
    }
  }
  useEffect(() => {
    fetchClincianDetails()
  }, [])
  return (
    <Card sx={{ px: 2, py: 1 }}>
      <Stack direction='row' spacing={1}>
        {!details && loading && <Skeleton height={28} width={160} />}
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
    </Card>
  )
}
export default ClincianDetails
