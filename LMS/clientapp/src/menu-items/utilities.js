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

const utilities = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Contacts',
            type: 'item',
            url: '/contacts',
            icon: icons.FontSizeOutlined,
            access:['Admin','User']
        },
        {
            id: 'util-color',
            title: 'Accounts',
            type: 'item',
            url: '/accounts',
            icon: icons.BgColorsOutlined,
            access:['Admin','User']
        },
        {
            id: 'util-user',
            title: 'Manage Users',
            type: 'item',
            url: '/users',
            icon: icons.BarcodeOutlined,
            access:['Admin']
        },
        // {
        //     id: 'ant-icons',
        //     title: 'Ant Icons',
        //     type: 'item',
        //     url: '/icons/ant',
        //     icon: icons.AntDesignOutlined,
        //     breadcrumbs: false
        // }
    ]
};

export default utilities;
