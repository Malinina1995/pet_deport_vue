import axios from "axios";

const state = {
    products: {}
}

const actions = {
    initStore: ({commit}) => {
        axios.get('/products.json')
            .then(res => {
                commit('SET_STORE', res.data.products)
            })
    }
}

const mutations = {
    'SET_STORE'(state, products) {
        state.products = products
    }
}

const getters = {
    products: state => state.products
}

export default {
    state, actions, mutations, getters
}