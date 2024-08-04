import { useRef as f, useEffect as h } from "react";
const g = ({
  containerRef: d,
  draw: o
}) => {
  const c = f(null);
  return h(() => {
    const r = d.current;
    if (!r) {
      console.log("No container");
      return;
    }
    let e = c.current;
    e || (console.log("No canvas"), c.current = e = document.createElement("canvas"), r.appendChild(e));
    const n = e.getContext("2d");
    if (!n) {
      console.log("No context");
      return;
    }
    let a, l = 0;
    const i = () => {
      const t = window.devicePixelRatio, { width: u, height: m } = e.parentElement.getBoundingClientRect();
      e.width = u * t, e.height = m * t, n.scale(t, t);
    }, s = () => {
      l++, n.fillStyle = "black", n.fillRect(0, 0, e.width, e.height), o && o(n, e, l), a = window.requestAnimationFrame(s);
    };
    return i(), window.addEventListener("resize", i), s(), () => {
      window.removeEventListener("resize", i), window.cancelAnimationFrame(a);
    };
  }, [o]), null;
};
export {
  g as Canvas
};
//# sourceMappingURL=index.es.js.map
