import React, { FunctionComponent, useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import ArrowRightOrange from "../assets/svg/arrow_right_orange.svg";
import TextLinesBlue from "../assets/svg/text_lines_blue.svg";
import SheetWhite from "../assets/svg/sheet_white.svg";
import { debounce } from "../utils/graphic-debounce";

// noinspection DuplicatedCode
const GraphicPink: FunctionComponent = ({}) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", debounce(handleScroll));
    return () => window.removeEventListener("scroll", debounce(handleScroll));
  }, [debounce]);

  const [{ springscrollY }, springsetScrollY] = useSpring(() => ({
    springscrollY: 0,
  }));
  springsetScrollY({ springscrollY: scrollY });
  const interpArrow1 = springscrollY.interpolate(
    (o) => `translateX(${o / 20 - 150}px)`
  );

  return (
    <animated.div className="graphic-pink" aria-hidden={true}>
      <animated.div className="brochure">
        <img src="/img/brochure.png" alt="" />
      </animated.div>
      <animated.div className="arrow1" style={{ transform: interpArrow1 }}>
        <ArrowRightOrange />
      </animated.div>
      <animated.div className="arrow2">
        <ArrowRightOrange />
      </animated.div>
      <animated.div className="lines">
        <TextLinesBlue />
      </animated.div>
      <animated.div className="sheet">
        <SheetWhite />
      </animated.div>
    </animated.div>
  );
};

export default GraphicPink;
