// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'user',
    title: 'User',
    type: 'group',
    children: [
        {
            id: 'teacher',
            title: 'Teacher',
            type: 'item',
            url: '/teacher',
            icon: icons.ChromeOutlined
        },
        {
            id: 'student',
            title: 'Student',
            type: 'item',
            url: '/student',
            icon: icons.ChromeOutlined
        }
    ]
};

export default support;
