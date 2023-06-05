import { useMediaQuery as useMedia } from '@mui/material'

export const useMediaQueryMin = (pixels: number) => useMedia(`(min-width:${pixels}px)`)

export const useMediaQueryMax = (pixels: number) => useMedia(`(max-width:${pixels}px)`)

