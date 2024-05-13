import { Box, Divider } from '@mui/material';

import SearchInput from './SearchInput';
import Conversations from './Conversations';

const Sidebar = () => {
  return (
    <Box borderRight='1px solid #718096' p={2} display='flex' flexDirection='column' cx={{ with: '30%' }}>
      <SearchInput />
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Conversations />
    </Box>
  );
}

export default Sidebar;
