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
        <div>
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
