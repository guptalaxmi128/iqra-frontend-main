// material-ui
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
        <Button variant="contained" sx={{
            width:'100%',
            maxWidth: '200px',
            m:'auto',
        }}>
            LOGOUT
        </Button>
);

export default NavCard;
