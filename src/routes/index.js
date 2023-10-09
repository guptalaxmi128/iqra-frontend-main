import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes(props) {
    const { user } = props;
    // return useRoutes(user ? [MainRoutes] : [LoginRoutes]);
    return useRoutes([MainRoutes]);
}
