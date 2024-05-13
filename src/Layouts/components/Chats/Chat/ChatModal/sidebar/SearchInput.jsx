import { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const searchConversation = conversations.find((conversation) => conversation.fullname.toLowerCase().includes(search.toLowerCase()));
    if (searchConversation) {
      setSelectedConversation(searchConversation);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <TextField
        label='Search...'
        variant='outlined'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type='submit' className='bg-sky-500 text-white' >
        <SearchIcon onclick={handleSubmit} />
      </IconButton>
    </form>
  );
}

export default SearchInput;
