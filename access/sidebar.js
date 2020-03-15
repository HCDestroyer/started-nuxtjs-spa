let crud = (( option, redirect = null, only = []) => {
    redirect = (redirect == null ) ? option : redirect;
    let CRUD = [
        {
            key: new String(option).trim().replace('-','_') + '_index',
            icon: 'mdi-clipboard-text-outline',
            redirect: redirect,
            title: 'list',
            actions:[]
        },
        {
            key: new String(option).trim().replace('-', '_') + '_create',
            icon: 'mdi-plus-circle-outline',
            redirect: redirect + '-create',
            title: 'add',
            actions:[]
        },
    ];
    let filterCRUD = [];
    if (only.length > 0) {
        CRUD.map((row) => {
            if (only.includes(row.title)) 
            {
                filterCRUD.push(row);
            }
        });
        CRUD = filterCRUD;
    }
    return CRUD;
});
export default [
    {
        key: 'index',
        icon: 'mdi-apps',
        redirect: 'index',
        title: 'home',
        list: false,        
        actions: false,
        options: []
    },
    {
        key: 'customers_index',
        icon: 'mdi-account-box-outline',
        redirect: 'customers',
        title: 'customers',
        list: true,        
        actions: false,
        options: crud('customers')
    },
    {
        key: 'access_index',
        icon: 'mdi-shield-account-outline',
        redirect: 'access',
        title: 'access',
        list: true,        
        actions: true,
        options: [
            {
                key: 'roles_index',
                icon: 'mdi-security',
                redirect: 'roles',
                title: 'roles',
                actions: crud('roles')
            },
            {
                key: 'users_index',
                icon: 'mdi-clipboard-account-outline',
                redirect: 'users',
                title: 'users',
                actions: crud('users')
            },
        ]
    },
];