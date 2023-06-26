import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MediaWrapper = (props) => {
  const classes = _.get(props, 'classes');
  const fields = _.get(props, 'fields');
  const asset = _.get(fields, 'asset');
  const assetUrl = _.get(asset, 'fields.file.url');
  const assetType = _.get(asset, 'fields.file.contentType');
  const assetWidth = _.get(asset, 'fields.file.details.image.width');
  const assetHeight = _.get(asset, 'fields.file.details.image.height');

  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    try {
      if (assetType.startsWith('image')) {
        setIsImage(true);
      }
    } catch (error) {}

    return () => {
      setIsImage(false);
    };
  }, [assetType]);

  if (!assetUrl) {
    return '..';
  }

  return (
    <div className="relative w-full h-full min-w-full  p-2 overflow-hidden">
      {isImage ? (
        <div className="">
          <div className="flex justify-center h-full">
            <div className="rounded-lg  max-w-sm ">
              <Image
                className={`${classes} `}
                src={`https:${assetUrl}`}
                width={assetWidth}
                height={assetHeight}
                alt=""
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MediaWrapper;
