import React, { useEffect, useState } from 'react'
import {FaArrowUp} from "react-icons/fa"

export default function ScrollToTopBtn() {
    const [isVisible, setisVisible] = useState(false)
    // function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const handleScroll = () => {
        if(window.scrollY > 300) {
            setisVisible(true);
        } else {
            setisVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll );
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])
    
  return <>
  <button className={`scrollToTop  ${isVisible? 'show' : 'hide'}`} onClick={scrollToTop}>
    <FaArrowUp/>
  </button>
  </>
}
