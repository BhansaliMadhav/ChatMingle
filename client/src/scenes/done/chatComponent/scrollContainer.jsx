import React, { useRef, useEffect, useState, useCallback } from 'react';

export const ScrollContainer = ({ children, scrollCta }) => {
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);

  const prevInnerDivHeight = useRef(null);

  const [showMessages, setShowMessages] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerDivHeight - outerDivHeight,
        left: 0,
        behavior: prevInnerDivHeight.current ? 'smooth' : 'auto',
      });
      setShowMessages(true);
    } else {
      setShowScrollButton(true);
    }

    prevInnerDivHeight.current = innerDivHeight;
  }, [children]);

  const handleScrollButtonClick = useCallback(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerDivHeight - outerDivHeight,
      left: 0,
      behavior: 'smooth',
    });

    setShowScrollButton(false);
  }, []);

  return (
    <div sx={{ position: 'relative', height: '100%' }}>
      <div
        sx={{
          position: 'relative',
          height: '100%',
          overflow: 'scroll',
        }}
        ref={outerDiv}
      >
        <div
          sx={{
            position: 'relative',
            transition: 'all 300ms',
            opacity: showMessages ? 1 : 0,
          }}
          ref={innerDiv}
        >
          {children}
        </div>
      </div>
      <button
        sx={{
          position: 'absolute',
          backgroundColor: 'red.500',
          color: 'white',
          bottom: '1',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28',
          borderRadius: 'lg',
          fontSize: 'sm',
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? 'auto' : 'none',
          transition: 'all 300ms',
        }}
        onClick={handleScrollButtonClick}
      >
        {scrollCta}
      </button>
    </div>
  );
};
