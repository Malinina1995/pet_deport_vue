import axios from "axios";

const state = {
    products: {},
    session: false
}

const actions = {
    initStore: ({commit}) => {
        axios.get('/products.json')
            .then(res => {
                commit('SET_STORE', res.data.products)
            })
    },

}

const mutations = {
    'SET_STORE'(state, products) {
        state.products = products
    },
    'SET_SESSION'(state, session) {
        state.session = session
    }
}

const getters = {
    products: state => state.products,
    session: state => state.session
}

export default {
    state, actions, mutations, getters
}
