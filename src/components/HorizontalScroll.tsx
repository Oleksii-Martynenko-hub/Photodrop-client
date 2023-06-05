import React, { FC, MouseEvent } from 'react'
import {
  ScrollMenu,
  VisibilityContext,
  Props as ScrollMenuProps,
} from 'react-horizontal-scrolling-menu'
import styled from 'styled-components'

import { UseDragObject } from 'components/hooks/useDrag'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

interface Props extends ScrollMenuProps {
  paddingX?: number
  spacing?: number
  useDragObject: UseDragObject
}

const HorizontalScroll: FC<Props> = ({ paddingX = 15, spacing = 5, useDragObject, children }) => {
  const { dragStart, dragMove, dragStop, dragging } = useDragObject

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })

  return (
    <HorizontalScrollWrapper
      paddingX={paddingX}
      spacing={spacing}
      dragging={dragging}
      onMouseLeave={dragStop}
    >
      <ScrollMenu onMouseDown={() => dragStart} onMouseUp={() => dragStop} onMouseMove={handleDrag}>
        {children}
      </ScrollMenu>
    </HorizontalScrollWrapper>
  )
}

export default HorizontalScroll

const HorizontalScrollWrapper = styled.div<{
  dragging: boolean
  paddingX?: number
  spacing?: number
}>`
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 0 ${({ paddingX }) => paddingX + 'px'};

    .react-horizontal-scrolling-menu--separator {
      min-width: ${({ spacing }) => spacing + 'px'};
    }
  }

  cursor: ${({ dragging }) => (dragging ? 'grabbing' : 'auto')};
`
