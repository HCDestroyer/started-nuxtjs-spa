export const state = () => ({
    lang: {
        key: 'es_GT',
        lang: 'es',
        flag: 'gt',
        country: 'GT'
    },
    key:'es_GT',
    dicctionary: [
        {
            key:'es_GT',
            lang: 'es',
            flag: 'gt',
            country: 'GT'
        }, 
        {
            key: 'en_US',
            lang: 'en',
            flag: 'us',
            country: 'US'            
        }, 
    ],
    glosary:
    {
        es_GT: require('~/locales/es/gt').default,
        en_US: require('~/locales/en/us').default,
    }
})

export const mutations = {
    change_lang(state, item) {
        state.lang = item;
        state.key = item.key
    },
}

export const getters = {
    dicctionaryLangs: (state) => state.dicctionary,
    selectLang: (state) => state.lang,
    trans: (state) => state.glosary[state.key],
}
