const prefix = {
    super: "super",
};
export const state = () => ({
    name: '',
    sidebar: require('@/access/sidebar').default,
    permissions: require('@/access/permissions').default,
    title: '',
    toolbar: {
        status: false,
        title: '',
        buttons: []
    }
});
export const mutations = {
    change_toolbar: (state, toolbar) => {
        state.toolbar = toolbar;
    },
    change_name: (state, name) => {
        state.name = name;
    },
    change_title: (state, title) => {
        state.title = title;
    }
}