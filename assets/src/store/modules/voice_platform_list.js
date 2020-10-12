function initialState() {
    return {
        platforms: [],
        currentPlatformData: {
            platform: "",
            platform_id: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    platforms: state => {
        let platformData = state.platforms
        return platformData
    },
    currentPlatform: state => state.currentPlatformData,

    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchPlatformData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-platforms")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setPlatformData', response.data.platforms);
                        commit('setSuccessMessage', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setErrorMessage', message)
                console.log(message)
            })
    },

    selectPlatform({ commit }, value1, value2) {
        commit('selectPlatform', value1, value2)
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setPlatformData(state, items) {
        state.platforms = items
    },
    selectPlatform(state, value1, value2) {
        state.currentAccent.platform      = value1['platform']
        state.currentAccent.platform_id   = value1['id_platform']

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
