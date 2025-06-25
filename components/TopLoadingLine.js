import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const TopLoadingLine = () => {

    const router = useRouter();
    const [loadingProgress, setloadingProgress] = useState(0);


    useEffect(() => {
        const handleStart = () => {
            setloadingProgress(80);
        }

        const handleComplete = () => {
            setloadingProgress(100);
            setTimeout(() => {
                setloadingProgress(0);
            }, 500);
        }

        // add event listeners for page loading
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        // clean up event listeners
        return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
        }

    },[router.events])

  return(
  <div className="topLoadingLine" style={{width: `${loadingProgress}%` }} />
  );
  
};

export default TopLoadingLine;
