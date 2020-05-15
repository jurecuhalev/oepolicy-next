/*
 * Parallax code example from:
 * https://ironeko.com/posts/parallax-effect-with-react-spring-how-to/
 */
import React, { FunctionComponent, useEffect, useState } from "react";
import PieChartColour from "../assets/svg/piechart_colour.svg";
import BarChartPink from "../assets/svg/barchart_pink.svg";

import { animated, useSpring } from "react-spring";
import { debounce } from "../utils/graphic-debounce";

// noinspection DuplicatedCode
const GraphicOrange: FunctionComponent = ({}) => {
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
  const interpBrowser1 = springscrollY.interpolate(
    (o) => `translateY(${o / -30}px)`
  );
  const interpBrowser2 = springscrollY.interpolate(
    (o) => `translateX(${o / -15}px)`
  );

  return (
    <animated.div className="graphic-orange" aria-hidden={true}>
      <animated.div className="browser1" style={{ transform: interpBrowser1 }}>
        <img src="/img/browser.png" alt="" aria-hidden={true} />
        <PieChartColour />
      </animated.div>
      <animated.div className="browser2" style={{ transform: interpBrowser2 }}>
        <img src="/img/browser.png" alt="" aria-hidden={true} />
        <BarChartPink />
      </animated.div>
    </animated.div>
  );
};

export default GraphicOrange;
