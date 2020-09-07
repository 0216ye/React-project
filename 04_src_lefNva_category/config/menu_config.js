export default[
    //用于配置左侧菜单，动态的生成菜单-->一个对象为一个根菜单
    {
        key: 'home',
        icon: 'HomeOutlined',
        path: '/admin/home',
        title: '首页'
    },
    {
        key: 'prod-about',
        icon: 'AppstoreOutlined',
        title: '商品',
        childrens:[ //子菜单-->一个对象就是一个二级菜单
            {
                key: 'category',
                icon: 'UnorderedListOutlined',
                path: '/admin/prod-about/category',
                title: '分类管理'
            },
            {
                key: 'product',
                icon: 'ToolOutlined',
                path: '/admin/prod-about/product',
                title: '商品管理'
            }
        ]
    },
    {
        key: 'user',
        icon: 'UserOutlined',
        path: '/admin/user',
        title: '用户管理'
    },
    {
        key: 'role',
        icon: 'SafetyOutlined',
        path: '/admin/role',
        title: '角色管理'
    },
    {
        key: 'chart',
        icon: 'AreaChartOutlined',
        title: '图表管理',
        childrens:[
            {
                key: 'bar',
                icon: 'BarChartOutlined',
                path: '/admin/chart/bar',
                title: '柱状图'  
            },
            {
                key: 'line',
                icon: 'LineChartOutlined',
                path: '/admin/chart/line',
                title: '折线图'  
            },
            {
                key: 'pie',
                icon: 'PieChartOutlined',
                path: '/admin/chart/pie',
                title: '饼状图'  
            }
        ]
    },
]