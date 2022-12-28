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

const content = {
    id: 'content',
    title: 'Content',
    type: 'group',
    children: [
       {
            id: 'course',
            title: 'Course',
            type: 'item',
            url: '/course',
            icon: icons.AppstoreAddOutlined
       },
       {
            id: 'banner',
            title: 'Banner',
            type: 'item',
            url: '/banner',
            icon: icons.AppstoreAddOutlined
       }
    ]
};

export default content;
