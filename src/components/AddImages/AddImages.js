/**
 * Creates a sortable image grid with children added to the end of the created grid.
 *
 * Example:
 * // images = [{ id: 'tempId', imageId: 'realIdFromAPI', file: File }];
 * <AddImages images={images}>
 *   <input type="file" accept="images/*" onChange={handleChange} />
 * </AddImages>
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ImageFromFile, ResponsiveImage, IconSpinner } from "..";
import css from './AddImages.module.css';
import RemoveImageButton from './RemoveImageButton';

const ThumbnailWrapper = props => {
  const { className, image, savedImageAltText, onRemoveImage } = props;
  const handleRemoveClick = e => {
    e.stopPropagation();
    onRemoveImage(image.id);
  };

  if (image.file) {
    // Add remove button only when the image has been uploaded and can be removed
    const removeButton = image.imageId ? <RemoveImageButton onClick={handleRemoveClick} /> : null;

    // While image is uploading we show overlay on top of thumbnail
    const uploadingOverlay = !image.imageId ? (
      <div className={css.thumbnailLoading}>
        <IconSpinner />
      </div>
    ) : null;

    return (
      <ImageFromFile
        className={className}
        file={image.file}
        id={image.id}
        rootClassName={css.thumbnail}
      >
        {removeButton}
        {uploadingOverlay}
      </ImageFromFile>
    );
  } else {
    const classes = classNames(css.thumbnail, className);
    return (
      <div className={classes}>
        <div className={css.threeToTwoWrapper}>
          <div className={css.aspectWrapper}>
            <ResponsiveImage
              alt={savedImageAltText}
              image={image}
              rootClassName={css.rootForImage}
              variants={['landscape-crop', 'landscape-crop2x']}
            />
          </div>
          <RemoveImageButton onClick={handleRemoveClick} />
        </div>
      </div>
    );
  }
};

ThumbnailWrapper.defaultProps = { className: null };

const { array, func, node, string, object } = PropTypes;

ThumbnailWrapper.propTypes = {
  className: string,
  image: object.isRequired,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

const AddImages = props => {
  const {
    children,
    className,
    thumbnailClassName,
    images,
    savedImageAltText,
    onRemoveImage,
  } = props;
  const classes = classNames(css.root, className);
  return (
    <div className={classes}>
      {images.map((image, index) => (
          <ThumbnailWrapper
            key={image.id.uuid || image.id}
            className={thumbnailClassName}
            image={image}
            index={index}
            onRemoveImage={onRemoveImage}
            savedImageAltText={savedImageAltText}
          />
        ))}
      {children}
    </div>
  );
};

AddImages.defaultProps = { className: null, thumbnailClassName: null, images: [] };

AddImages.propTypes = {
  images: array,
  children: node.isRequired,
  className: string,
  thumbnailClassName: string,
  savedImageAltText: string.isRequired,
  onRemoveImage: func.isRequired,
};

export default AddImages;
