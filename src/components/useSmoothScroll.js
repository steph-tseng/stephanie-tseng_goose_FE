import React, { useEffect, useRef } from "react";

export const useSmoothScrollTo = (id) => {
  const ref = useRef(null);
  useEffect(() => {
    const listener = (e) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", listener, true);
    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, []);
  return {
    "data-anchor-id": id,
    ref,
  };
};
