export default [
    {
        key: 'access_index',
        icon: 'mdi-shield-account-outline',
        redirect: 'access',
        title: 'access',
        actions: [
            {
                key: 'roles_index',
                parent_key: 'access_index',
                icon: 'mdi-security',
                redirect: 'roles',
                title: 'roles',
            },
            {
                key: 'users_index',
                parent_key: 'access_index',
                icon: 'mdi-clipboard-account-outline',
                redirect: 'users',
                title: 'users',
            },
        ]
    },
];