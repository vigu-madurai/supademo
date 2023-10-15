import Head from 'next/head';
import { useEffect, useState } from 'react';

import { fuzzySearch } from '@/lib/utils';
import useResizeScreen from '@/hooks/resize';

import VideoCard from '@/components/cards/VideoCard';
import SearchInput from '@/components/search/input';
import YoutubeEmbed from '@/components/videoplayer/YoutubePlayer';

import { DashboardItem } from '@/__mocks__/dashboard/types';
import { SEARCH_RESULT_DEFAULT_VALUE } from '@/constant/defaultConstants';

const Dashboard = ({ data }: { data: DashboardItem[] }) => {
  const [dashboardData] = useState(data);
  const [activeVideo, setActiveVideo] = useState(
    dashboardData[0].id.videoId || ''
  );

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(
    SEARCH_RESULT_DEFAULT_VALUE
  );

  const handleSearch = async (newInput: string) => {
    setSearchInput(newInput);
  };

  // const [pagination, setPagination] = useState(PAGINATION_DEFAULT_VALUE);
  // const handlePagination = (modifiedValues: PaginationDefaultType) => {
  //   setPagination(modifiedValues);
  // };

  useEffect(() => {
    if (searchInput) {
      const searchResults = fuzzySearch(data, searchInput, 'title');
      setSearchResults({
        loading: false,
        results: searchResults,
      });
    } else {
      setSearchResults({
        loading: false,
        results: dashboardData,
      });
    }
  }, [searchInput]);
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
        <div>
          <SearchInput
            input={searchInput}
            handleSearchCallback={handleSearch}
          />
        </div>

        <div>Pagination</div>
        <div className='flex flex-wrap items-center justify-between'>
          {searchResults.results.map((item) => {
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
