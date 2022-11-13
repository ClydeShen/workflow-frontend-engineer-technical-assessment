export const pipePromises =
  (...fns) =>
  (...config) =>
    fns.reduce((p, fn) => p.then(fn), Promise.resolve(config))

export const ResponseStatus = (code) => {
  switch (code) {
    case 204: {
      return true
    }
    case 400:
    case 401:
    case 404: {
      return false
    }

    default: {
      return false
    }
  }
}
