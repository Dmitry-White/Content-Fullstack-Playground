import _ from 'lodash';
import Image from 'next/image';

const ImageComponent = (props) => {
  const image = _.get(props, 'image.image[0]');

  const imgUrl = _.get(image, 'asset.url');
  const imgAltText = _.get(image, 'alt_text');

  if (!image) {
    return '';
  }

  return (
    <>
      <div className="w-[400px]x overflow-hidden">
        <Image
          src={imgUrl}
          width={1920}
          height={1080}
          layout="responsive"
          alt={imgAltText}
        />
      </div>
    </>
  );
};

export default ImageComponent;
