export const pipePromises =
  (...fns) =>
  (...config) =>
    fns.reduce((p, fn) => p.then(fn), Promise.resolve(config))
