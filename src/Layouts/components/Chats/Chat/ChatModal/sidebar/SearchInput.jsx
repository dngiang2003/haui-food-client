import { useState } from 'react';
import classNames from 'classnames/bind';
import { IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import styles from './SearchInput.module.scss';

import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const cx = classNames.bind(styles);

const SearchInput = () => {
  const { t } = useTranslation();
  
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const searchConversation = conversations.find((conversation) =>
      conversation.fullname.toLowerCase().includes(search.toLowerCase()),
    );
    if (searchConversation) {
      setSelectedConversation(searchConversation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cx('search')}>
      <input
        type="text"
        placeholder={t('home-banner.btn01')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ outline: 'none', border: 'none', fontSize: '1.5rem' }}
      />
      <IconButton type="submit">
        <SearchIcon onclick={handleSubmit} style={{ color: 'var(--primary-bg)', width: '22px', height: '22px' }} />
      </IconButton>
    </form>
  );
};

export default SearchInput;
