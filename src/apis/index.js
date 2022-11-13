import { pipePromises } from '../utils/functions'

const injectHeader = async ([path, method, config]) => {
  let sessionToken =
    config?.headers?.get('Authorization') ||
    window.sessionStorage.getItem('session-token')
  if (sessionToken) {
    const headers = new Headers()
    headers.set('Authorization', sessionToken)
    return [path, method, { ...config, headers }]
  }
  return [path, method, config]
}
const request = async ([path, method, config]) => {
  return fetch(path, {
    method,
    ...config
  }).then((res) =>
    res.json().then((data) => {
      if (!res.ok) {
        throw new Error(data.errorMessage || 'HTTP error')
      }
      return data
    })
  )
}

const call = pipePromises(injectHeader, request)
const API = {
  POST: {
    login: (config) => call('/login', 'POST', config)
  },
  GET: {
    clinicianDetails: () => call('/clinician-details', 'GET'),
    patients: () => call('/patients', 'GET'),
    patientDetails: (patientId) => call(`/patient-details/${patientId}`, 'GET')
  }
}
export default API
