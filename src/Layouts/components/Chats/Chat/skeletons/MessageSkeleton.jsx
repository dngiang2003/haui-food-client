import { Skeleton, Box } from '@mui/material';

const MessageSkeleton = () => {
    return (
        <>
            <Box className='flex gap-3 items-center'>
                <Skeleton variant='circular' width={40} height={40} />
                <Box className='flex flex-col gap-1'>
                    <Skeleton variant='text' width={200} height={16} />
                    <Skeleton variant='text' width={200} height={16} />
                </Box>
            </Box>
            <Box className='flex gap-3 items-center justify-end'>
                <Box className='flex flex-col gap-1'>
                    <Skeleton variant='text' width={200} height={16} />
                </Box>
                <Skeleton variant='circular' width={40} height={40} />
            </Box>
        </>
    );
};

export default MessageSkeleton;
