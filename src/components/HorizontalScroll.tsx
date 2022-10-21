import React, { FC, MouseEvent } from 'react'

import {
  ScrollMenu,
  VisibilityContext,
  Props as ScrollMenuProps,
} from 'react-horizontal-scrolling-menu'
import styled from 'styled-components'
import useDrag from './hooks/useDrag'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ScrollMenuProps {}

const HorizontalScroll: FC<Props> = ({ children }) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag()

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })

  return (
    <HorizontalScrollWrapper dragging={dragging} onMouseLeave={dragStop}>
      <ScrollMenu onMouseDown={() => dragStart} onMouseUp={() => dragStop} onMouseMove={handleDrag}>
        {children}
      </ScrollMenu>
    </HorizontalScrollWrapper>
  )
}

export default HorizontalScroll

const HorizontalScrollWrapper = styled.div<{ dragging: boolean }>`
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 0 15px;

    .react-horizontal-scrolling-menu--separator {
      min-width: 5px;
    }
  }

  cursor: ${({ dragging }) => (dragging ? 'auto' : 'pointer')};
`
