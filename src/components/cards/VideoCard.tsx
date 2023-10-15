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
    // width = thumbnails[thumbnailType].width,
    // height = thumbnails[thumbnailType].height,
  } = thumbnails[thumbnailType];
  return (
    <div
      className='hover:[box-shadow:0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0, 0, 0, 0.263)] mx-[0] my-4 flex h-[170px] w-full cursor-pointer rounded-[5px] [box-shadow:0_1px_3px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)] md:!w-[48%]'
      onClick={() => handleActiveVideo(id)}
    >
      <div className='relative flex min-w-[30%]'>
        <Image
          src={url}
          fill
          alt={title}
          className='rounded-bl-[5px] rounded-tl-[5px]'
        />
      </div>
      <div className='w-[70%]  p-4'>
        <div className='h-[44px] overflow-hidden text-[18px] font-semibold leading-[1.24]'>
          {title}
        </div>
        <div className='mx-[0] my-2 h-[50px] overflow-hidden text-[14px] font-light'>
          {description}
        </div>
        <div className='text-[15px] font-medium'>{channelTitle}</div>
      </div>
    </div>
  );
};

export default VideoCard;
