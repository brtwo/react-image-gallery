import React, { useRef, useEffect } from 'react';
import { bool, func, number, string } from 'prop-types';

const Item = React.memo(({
  description,
  fullscreen, // fullscreen version of img
  handleImageLoaded,
  isFullscreen,
  onImageError,
  original,
  originalAlt,
  originalHeight,
  originalWidth,
  originalTitle,
  sizes,
  srcSet,
  loading,
  video,
  currentIndex,
}) => {
  const itemSrc = isFullscreen ? (fullscreen || original) : original;

  const videoRef = useRef();

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.pause();
    }
  }, [currentIndex])

  return (
    <React.Fragment>
      {
        video ? (
          <video
            ref={videoRef}
            src={video}
            alt={originalAlt}
            title={originalTitle}
            height={originalHeight}
            width={originalWidth}
            loading={loading}
            className="image-gallery-image"
            loop
            controls
            controlsList="nodownload"
          />
        ) : (
          <img
            className="image-gallery-image"
            src={itemSrc}
            alt={originalAlt}
            srcSet={srcSet}
            height={originalHeight}
            width={originalWidth}
            sizes={sizes}
            title={originalTitle}
            onLoad={event => handleImageLoaded(event, original)}
            onError={onImageError}
            loading={loading}
          />
        )
      }
      {
        description && (
          <span className="image-gallery-description">
            {description}
          </span>
        )
      }
    </React.Fragment>
  );
});

Item.displayName = 'Item';

Item.propTypes = {
  description: string,
  fullscreen: string, // fullscreen version of img
  handleImageLoaded: func.isRequired,
  isFullscreen: bool,
  onImageError: func.isRequired,
  original: string.isRequired,
  originalAlt: string,
  originalHeight: string,
  originalWidth: string,
  originalTitle: string,
  sizes: string,
  srcSet: string,
  loading: string,
  video: string,
  currentIndex: number,
};

Item.defaultProps = {
  description: '',
  fullscreen: '',
  isFullscreen: false,
  originalAlt: '',
  originalHeight: '',
  originalWidth: '',
  originalTitle: '',
  sizes: '',
  srcSet: '',
  loading: 'eager',
};

export default Item;
