// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    const user = useSelector((state) => state.auth.auth);
    return (
        <ThemeCustomization>
            <ScrollTop>
                <Routes user={user}/>

            </ScrollTop>
        </ThemeCustomization>
    );
};

export default App;
