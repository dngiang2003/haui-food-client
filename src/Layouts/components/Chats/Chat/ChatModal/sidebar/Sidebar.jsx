import classNames from 'classnames/bind';
import { Box, Divider } from '@mui/material';

import styles from './Sidebar.module.scss';

import SearchInput from './SearchInput';
import Conversations from './Conversations';

const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <Box className={cx('sidebar')}>
      <SearchInput />
      <Divider className={cx('sidebar__separate')} sx={{ mt: 2, mb: 2 }} />
      <Conversations />
    </Box>
  );
};

export default Sidebar;
