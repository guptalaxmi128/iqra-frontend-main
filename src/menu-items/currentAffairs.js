// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const currentAffairs = {
    id: 'currentAfairs',
    title: 'Current Affairs',
    type: 'group',
    children: [
        {
            id: 'article',
            title: 'Weekly News',
            type: 'item',
            url: '/article',
            icon: icons.AppstoreAddOutlined
        },
        {
            id: 'editorial',
            title: 'Important Issues',
            type: 'item',
            url: '/editorial',
            icon: icons.AppstoreAddOutlined
        }
    ]
};

export default currentAffairs;
