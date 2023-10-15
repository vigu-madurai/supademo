import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Thumbnails } from '@/__mocks__/dashboard/types';

interface VideoCardTypes {
  title: string;
  description: string;
  channelTitle: string;
  thumbnails: Thumbnails | any;
  screenType: string;
  id: string | undefined;
  handleActiveVideo: (val: string) => void;
}

interface ThumbnailMappingTypes {
  [mobile: string]: string;
}

const THUMBNAIL_MAPPING: ThumbnailMappingTypes = {
  mobile: 'default',
  tablet: 'medium',
  desktop: 'high',
};

const VideoCard = ({
  title = '',
  description = '',
  id = '',
  thumbnails = {
    default: {
      url: '',
      width: 120,
      height: 90,
    },
    medium: {
      url: '',
      width: 320,
      height: 180,
    },
    high: {
      url: '',
      width: 480,
      height: 360,
    },
  },
  channelTitle = '',
  screenType = 'mobile',
  handleActiveVideo = () => {},
}: VideoCardTypes) => {
  const [thumbnailType, setThumbnailType] = useState(
    THUMBNAIL_MAPPING[screenType]
  );
  useEffect(() => {
    setThumbnailType(THUMBNAIL_MAPPING[screenType]);
  }, [screenType]);

  const {
    url = '',
    width = thumbnails[thumbnailType].width,
    height = thumbnails[thumbnailType].height,
  } = thumbnails[thumbnailType];
  return (
    <div className='wrapper' onClick={() => handleActiveVideo(id)}>
      <div>
        <Image src={url} width={width} height={height} alt={title} />
      </div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{channelTitle}</div>
    </div>
  );
};

export default VideoCard;
