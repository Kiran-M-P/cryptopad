import { useState, useEffect } from "react";

export default function WindowDimension() {
  const [size, setSize] = useState({
    x: window.innerWidth || 0,
    y: window.innerHeight || 0,
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);
  return size;
}
