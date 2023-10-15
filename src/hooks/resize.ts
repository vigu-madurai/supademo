import { useEffect, useState } from 'react';

const useResizeScreen = () => {
  const [resolution, setResolution] = useState({
    width: 320,
    height: 600,
    screenType: 'mobile',
  });
  const debounce = (fn: VoidFunction, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  const handleResize = () => {
    setResolution({
      width: window.innerWidth,
      height: window.innerHeight,
      screenType:
        window.innerWidth < 640
          ? 'mobile'
          : window.innerWidth < 1024
          ? 'tablet'
          : 'desktop',
    });
  };
  const debouncedCb = debounce(handleResize, 500);

  useEffect(() => {
    debouncedCb();
    if (typeof window !== undefined) {
      window.addEventListener('resize', debouncedCb);
    }
    return () => {
      window.removeEventListener('resize', debouncedCb);
    };
  }, []);

  return resolution;
};

export default useResizeScreen;
