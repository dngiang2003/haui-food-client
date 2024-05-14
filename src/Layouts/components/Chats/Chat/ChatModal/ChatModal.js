import { Box } from '@mui/material';

import Sidebar from './sidebar/Sidebar';
import MessageContainer from './messages/MessageContainer';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: { xs: 500, md: 550, lg: 600 },
        width: { xs: 500, md: 550, lg: 750 },
        borderRadius: '0.7rem',
        backgroundColor: 'white',
        backdropFilter: 'blur(10px)',
        backgroundClip: 'padding-box',
        position: 'absolute',
        right: { xs: '19vw', md: '6.3vw', xl: '6.4vw' },
        bottom: '84px',
        zIndex: '99999999999',
      }}
    >
      <Sidebar />
      <MessageContainer />
    </Box>
  );
};

export default Home;
