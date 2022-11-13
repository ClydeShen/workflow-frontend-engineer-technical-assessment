import { pipePromises } from '../utils/functions'

/**
 *
 * @param {Object[]} configuration
 * [
 *  path: string, - fetch url
 *  method: 'POST' | 'GET' - fetch method,
 *  config: Object -  fetch config object including headers or body
 * ]
 * @returns configuration with Authorization token
 */
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

/**
 *
 * @param {Object[]} configuration
 * [
 *  path: string, - fetch url
 *  method: 'POST' | 'GET' - fetch method,
 *  config: Object -  fetch config object including headers or body
 * ]
 * @returns fetch result in promise format
 */
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
//pipe function to inject request header automatically
const call = pipePromises(injectHeader, request)

// API middleware object defines all available requests
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
