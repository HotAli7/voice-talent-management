function initialState() {
    return {
        tones: [],
        currentToneData: {
            tone: "",
            tone_id: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    tones: state => {
        let toneData = state.tones
        return toneData
    },
    currentTone: state => state.currentToneData,

    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchToneData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-tones")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setToneData', response.data.tones);
                        commit('setSuccessMessage', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setErrorMessage', message)
                console.log(message)
            })
    },

    selectTone({ commit }, value1, value2) {
        commit('selectTone', value1, value2)
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setToneData(state, items) {
        state.tones = items
    },
    selectTone(state, value1, value2) {
        state.currentAccent.tone      = value1['tone']
        state.currentAccent.tone_id   = value1['id_tone']

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
