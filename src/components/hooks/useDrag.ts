import { MouseEvent, useCallback, useRef, useState } from 'react'

export interface UseDragObject {
  dragStart: (ev: MouseEvent) => void
  dragStop: () => number
  dragMove: (ev: MouseEvent, cb: (posDif: number) => void) => void
  dragging: boolean
  position: React.MutableRefObject<number>
  setDragging: React.Dispatch<React.SetStateAction<boolean>>
}

export const useDrag = (): UseDragObject => {
  const [clicked, setClicked] = useState(false)
  const [dragging, setDragging] = useState(false)
  const position = useRef(0)

  const dragStart = useCallback((ev: MouseEvent) => {
    position.current = ev.clientX
    setClicked(true)
  }, [])

  const dragStop = useCallback(
    () =>
      window.requestAnimationFrame(() => {
        setDragging(false)
        setClicked(false)
      }),
    [],
  )

  const dragMove = (ev: MouseEvent, cb: (posDif: number) => void) => {
    const newDiff = position.current - ev.clientX

    const movedEnough = Math.abs(newDiff) > 5

    if (clicked && movedEnough) {
      setDragging(true)
    }

    if (dragging && movedEnough) {
      position.current = ev.clientX
      cb(newDiff)
    }
  }

  return {
    dragStart,
    dragStop,
    dragMove,
    dragging,
    position,
    setDragging,
  }
}
