function initialState() {
    return {
        styles: [],
        currentStyleData: {
            style: "",
            style_id: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    styles: state => {
        let styleData = state.styles
        return styleData
    },
    currentStyle: state => state.currentStyleData,

    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchStyleData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-styles")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setStyleData', response.data.styles);
                        commit('setSuccessMessage', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setErrorMessage', message)
                console.log(message)
            })
    },

    selectStyle({ commit }, value1, value2) {
        commit('selectStyle', value1, value2)
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setStyleData(state, items) {
        state.styles = items
    },
    selectStyle(state, value1, value2) {
        state.currentAccent.style      = value1['style']
        state.currentAccent.style_id   = value1['id_style']

        let v = {
            modalName: value3,
            modalValue: true,
        }

        this.commit('setModalVisibility', v)
    },
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']
        console.log(state.talents.indexOf(value['talentID']))
        state[modalName] = modalValue
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    },
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
