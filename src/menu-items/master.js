// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const master = {
    id: 'master',
    title: 'Master',
    type: 'group',
    children: [
        {
            id: 'master1',
            title: 'Master',
            type: 'item',
            url: '/master',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};

export default master;
