function initialState() {
    return {
        accents: [],
        currentAccentData: {
            accent: "",
            accent_id: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    accents: state => {
        let accentData = state.accents
        return accentData
    },

    currentAccent: state => state.currentAccentData,

    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchAccentData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-accents")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setAccentData', response.data.accents);
                        commit('setSuccessMessage', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setErrorMessage', message)
                console.log(message)
            })
    },

    selectAccent({ commit }, value1, value2) {
        commit('selectAccent', value1, value2)
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAccentData(state, items) {
        state.accents = items
    },
    selectAccent(state, value1, value2) {
        state.currentAccent.accent      = value1['accent']
        state.currentAccent.accent_id   = value1['id_accent']

        let v = {
            modalName: value2,
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
