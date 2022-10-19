import { useEffect, useRef } from 'react'
import { Uppy } from '@uppy/core'

export default function useUppy(factory: () => Uppy) {
  if (typeof factory !== 'function') {
    throw new TypeError('useUppy: expected a function that returns a new Uppy instance')
  }

  const uppy = useRef<Uppy | undefined>(undefined)
  if (uppy.current === undefined) {
    uppy.current = factory()

    if (!(uppy.current instanceof Uppy)) {
      throw new TypeError(
        `useUppy: factory function must return an Uppy instance, got ${typeof uppy.current}`,
      )
    }
  }

  useEffect(() => {
    return () => {
      uppy.current?.close()
      uppy.current = undefined
    }
  }, [uppy])

  return uppy.current
}
