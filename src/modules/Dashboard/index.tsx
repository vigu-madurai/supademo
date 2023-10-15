import Head from 'next/head';
import { useEffect, useState } from 'react';

import { fuzzySearch } from '@/lib/utils';
import useResizeScreen from '@/hooks/resize';

import VideoCard from '@/components/cards/VideoCard';
import Pagination from '@/components/pagination/Pagination';
import SearchInput from '@/components/search/input';
import YoutubeEmbed from '@/components/videoplayer/YoutubePlayer';

import { DashboardItem } from '@/__mocks__/dashboard/types';
import {
  PAGINATION_DEFAULT_VALUE,
  PaginationDefaultType,
  SEARCH_RESULT_DEFAULT_VALUE,
} from '@/constant/defaultConstants';

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

  const [pagination, setPagination] = useState(PAGINATION_DEFAULT_VALUE);
  const handlePagination = (modifiedValues: PaginationDefaultType) => {
    setPagination(modifiedValues);
  };

  useEffect(() => {
    let searchResults = dashboardData;
    const { pageNo, pageSize } = pagination;
    const startPage = pageNo * pageSize;
    const endPage = startPage + pageSize;
    if (searchInput) {
      searchResults = fuzzySearch(data, searchInput, 'title');
    }
    searchResults = searchResults.slice(startPage, endPage);
    setSearchResults({
      loading: false,
      results: searchResults,
    });
  }, [searchInput, pagination]);
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
        <div className='my-4 p-1 pt-6 [box-shadow:0_1px_3px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)]'>
          <div>
            <SearchInput
              input={searchInput}
              handleSearchCallback={handleSearch}
            />
          </div>

          <div>
            <Pagination handlePaginationCallback={handlePagination} />
          </div>
        </div>

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
