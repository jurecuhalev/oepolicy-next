/*
 * Parallax code example from:
 * https://ironeko.com/posts/parallax-effect-with-react-spring-how-to/
 */
import React, { FunctionComponent, useEffect, useState } from "react"

import RectanglePink from "../assets/svg/rectangle_pink.svg"
import TextLinesBlue from "../assets/svg/text_lines_blue.svg"
import SheetWhite from "../assets/svg/sheet_white.svg"
import ArrowRightPink from "../assets/svg/arrow_right_pink.svg"

import { animated, useSpring } from "react-spring"
import { debounce } from "../utils/graphic-debounce"

// noinspection DuplicatedCode
const GraphicOrangeTools: FunctionComponent = () => {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", debounce(handleScroll))
    return () => window.removeEventListener("scroll", debounce(handleScroll))
  }, [debounce])

  const [{ springscrollY }, springsetScrollY] = useSpring(() => ({
    springscrollY: 0,
  }))
  springsetScrollY({ springscrollY: scrollY })
  const interpArrow1 = springscrollY.interpolate(
    (o) => `translateX(${o / 30}px)`
  )

  return (
    <animated.div className="graphic-orange-tools" aria-hidden={true}>
      <animated.div
        className="browser1"
        // style={{ transform: interpBrowser1 }}
      >
        <img src="/img/browser.png" alt="" aria-hidden={true} />
        <RectanglePink className="rectangle1" />
      </animated.div>
      <animated.div
        className="browser2"
        // style={{ transform: interpBrowser2 }}
      >
        <img src="/img/browser.png" alt="" aria-hidden={true} />
        <TextLinesBlue className="lines1" />
        <animated.div className="arrow1" style={{ transform: interpArrow1 }}>
          <ArrowRightPink />
        </animated.div>
      </animated.div>
      <animated.div className="sheet1">
        <SheetWhite />
      </animated.div>
    </animated.div>
  )
}

export default GraphicOrangeTools
