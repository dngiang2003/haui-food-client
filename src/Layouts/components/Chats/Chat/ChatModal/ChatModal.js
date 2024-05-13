import { Box } from '@mui/material';
import MessageContainer from "./messages/MessageContainer";
import Sidebar from "./sidebar/Sidebar";

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
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '32px',
          right: '-12px',
          width: 0,
          height: 0,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderLeft: '13px solid white',
          zIndex: '99999999999',
        }
      }}
    >
      <Sidebar />
      <MessageContainer />
    </Box>
  );
};

export default Home;
