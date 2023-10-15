import Head from 'next/head';
import { useState } from 'react';

import useResizeScreen from '@/hooks/resize';

import VideoCard from '@/components/cards/VideoCard';
import YoutubeEmbed from '@/components/videoplayer/YoutubePlayer';

import { DashboardItem } from '@/__mocks__/dashboard/types';

const Dashboard = ({ data }: { data: DashboardItem[] }) => {
  const [dashboardData] = useState(data);
  const [activeVideo, setActiveVideo] = useState(
    dashboardData[0].id.videoId || ''
  );
  const { screenType } = useResizeScreen();
  const handleActiveVideo = (id: string) => {
    setActiveVideo(id);
  };

  return (
    <>
      <Head>
        <title>MockTube</title>
      </Head>
      <div className='parent-wrapper container'>
        <div>
          <YoutubeEmbed videoId={activeVideo} />
        </div>
        <div className='my-4 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-1'></div>
        <div>Input</div>
        <div>Pagination</div>
        <div className='flex flex-wrap items-center justify-between'>
          {dashboardData.map((item) => {
            const { etag, snippet, id } = item;
            return (
              <VideoCard
                key={etag}
                id={id?.videoId}
                title={snippet?.title}
                description={snippet?.description}
                thumbnails={snippet?.thumbnails}
                channelTitle={snippet?.channelTitle}
                screenType={screenType}
                handleActiveVideo={handleActiveVideo}
              />
            );
          })}
          didi
        </div>
      </div>
    </>
  );
};

export default Dashboard;
