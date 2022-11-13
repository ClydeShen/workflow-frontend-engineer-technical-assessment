import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
type Patient = {
  id: string
  name: string
}
type Props = {
  patients?: Patient[]
  onSelect: (_patient: Patient) => void
}
const Patients = (props: Props) => {
  const { onSelect, patients } = props
  return (
    <List>
      {patients?.map((patient) => {
        return (
          <ListItem
            key={patient.id}
            onClick={() => onSelect(patient)}
            sx={{ cursor: 'pointer', display: 'flex', gap: '2em' }}
          >
            <ListItemText primary={`${patient.name} (${patient.id})`} />
          </ListItem>
        )
      })}
    </List>
  )
}
export default Patients
