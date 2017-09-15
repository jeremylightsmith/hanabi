import { assocPath, curry, path as rpath } from 'ramda'

export const updateIn = curry((path, fn, collection) => {
  const val = rpath(path, collection)
  return assocPath(path, fn(val), collection)
})
