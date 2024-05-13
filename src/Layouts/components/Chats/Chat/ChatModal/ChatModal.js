import { Box } from '@mui/material';

import Sidebar from './sidebar/Sidebar';
import MessageContainer from './messages/MessageContainer';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: { xs: 300, md: 450, lg: 550 },
        width: { xs: 250, md: 550, lg: 750 },
        borderRadius: '0.5rem',
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
