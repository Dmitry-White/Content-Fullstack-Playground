import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import MediaWrapper from './MediaWrapper';

const ImageGallery = (props) => {
  const [current, setCurrent] = useState(0);

  const gallery = _.get(props, 'gallery');

  const handleNext = useCallback(() => {
    try {
      if (current + 1 === gallery.length) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {}
  }, [current, gallery]);

  const handlePrevious = useCallback(() => {
    try {
      if (current - 1 === -1) {
        setCurrent(gallery.length - 1);
      } else {
        setCurrent(current - 1);
      }
    } catch (error) {}
  }, [current, gallery]);

  useEffect(() => {
    const changeFocusedImage = setInterval(() => {
      handleNext();
    }, 10000);

    return () => {
      clearInterval(changeFocusedImage);
    };
  }, [handleNext]);

  if (!gallery) {
    return '';
  }

  const renderButton = (flip = false) => (
    <div className="hidden lg:block  ">
      <button onClick={flip ? handleNext : handlePrevious}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d={
              flip
                ? 'M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z'
                : 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z'
            }
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );

  const renderImages = () => (
    <div
      style={{
        background: `linear-gradient( rgba(0,51,163,0.8) 100%, rgba(0,212,255, 0.5)100%)`,
      }}
      className="w-full bg-cover bg-center relative flex flex-col items-center justify-items-center h-full
   p-2 bg-blau  overflow-hidden"
    >
      <div
        className="  flex flex-col items-center justify-items-center
  relative border-2x overflow-hidden w-full transition-all delay-100 h-full p-2 lg:p-10 "
      >
        <div
          id="top"
          className="z-20 absolute transition-all delay-200  left-0
    hover:rotate-6  hover:top-12  hover:left-16 right-0 hover:scale-125"
        >
          <MediaWrapper
            classes={` h-[200px] h-auto lg:h-[350px]x w-auto object-cover  rounded-lg `}
            {...gallery[current]}
          />
        </div>

        <div id="bottom" className="z-10  ">
          <MediaWrapper
            classes={`h-[200px] h-auto lg:h-[350px]x w-auto object-cover  rounded-lg `}
            {...gallery[current]}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative w-full ">
        <br />
        <div className="relative w-full flex flex-col lg:flex-row lg:space-x-4 items-center lg:p-8 lg:h-[550px]x">
          {renderButton(true)}
          {renderImages()}
          {renderButton(false)}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
