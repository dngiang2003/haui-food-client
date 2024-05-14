import { useState } from 'react';
import { IconButton } from '@mui/material';
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
    <form onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '0.5rem',
        border: '1px solid #ccc',
        padding: '5px 10px',
        borderRadius: '0.5rem'
      }}
    >
      <input type="text"
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ outline: 'none', border: 'none' }}
      />
      <IconButton type='submit' >
        <SearchIcon onclick={handleSubmit} style={{ color: 'var(--primary-bg)', width: '20px', height: '20px' }} />
      </IconButton>
    </form>
  );
}

export default SearchInput;
