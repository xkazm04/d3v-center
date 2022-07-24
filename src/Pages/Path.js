import { useEffect } from "react";
import PathForm from "../components/forms/pathForm";

export default function Path() {

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

    useEffect(() => {
      scrollToTop()
      // eslint-disable-next-line
    }, []);

    return <><PathForm/></>;
  }