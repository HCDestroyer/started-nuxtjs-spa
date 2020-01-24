let crud = ((option, hidden = []) =>
{
    let CRUD = [
        {
            title: 'show',
            icon: 'mdi-mdi-eye-outline',
            key: option + '_show',
        },
        {
            title: 'add',
            icon: 'mdi-plus-circle-outline',
            key: option + '_create',
        },
        {
            title: 'edit',
            icon: 'mdi-pencil',
            key: option + '_edit',
        },
        {
            title: 'delete',
            icon: 'mdi-delete-outline',
            key: option + '_delete',
        }
    ];
    let filterCRUD = [];
    if (hidden.length > 0)
    {
        CRUD.map((row) =>
        {
            if (!hidden.includes(row.title))
            {
                filterCRUD.push(row);
            }
        });
        CRUD = filterCRUD;
    }
    return CRUD;
});
export default {
    accounts:{
        title: 'access_index',
        icon: 'mdi-shield-account-outline',
        key:'access_index',
        actions:true,
        options:[
            {

                title: 'users',
                icon: 'mdi-clipboard-account-outline',
                key: 'users_index',
                actions: crud('users',['delete']).concat([
                    {
                        title: 'roles',
                        icon: 'mdi-security',
                        key: 'users_roles',
                    }
                ])
            },
            {

                title: 'roles',
                icon: 'mdi-security',
                key: 'roles_index',
                actions: crud('roles').concat([
                    {
                        title: 'roles_permissions',
                        icon: 'mdi-delete-outline',
                        key: 'roles_permissions',
                    },
                    {
                        title: 'users',
                        icon: 'mdi-delete-outline',
                        key: 'roles_users',
                    }
                ])
            }
        ]
    },
    customers: {
        title: 'customers',
        icon: 'mdi-clipboard-account-outline',
        key: 'customers_index',
        actions: false,
        options: crud('customers')
    },
};