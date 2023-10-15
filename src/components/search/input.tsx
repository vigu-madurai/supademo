import { useState } from 'react';

const SearchInput = ({
  input = '',
  handleSearchCallback,
}: {
  input: string;
  handleSearchCallback: (arg: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState(input);
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setSearchInput(newInput);
    handleSearchCallback(newInput);
  };

  return (
    <div className='m-auto flex w-full max-w-lg justify-center'>
      <input
        className='w-full rounded-md'
        aria-label='Search any videos'
        placeholder='Search any videos'
        type='search'
        value={searchInput}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchInput;
