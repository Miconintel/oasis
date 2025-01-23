import { useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // console.log(e.target);
        // console.log(ref.current);
        // this confirms that you are clicking
        // outside of the referenced element.
        // so the target that the event will happen
        // is one that happened outside of the
        // referenced element.
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick);

      return () => document.removeEventListener("click", handleClick);
    },
    [handler]
  );

  return ref;
}
