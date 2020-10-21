function initialState() {
    return {
        genders: [],
        currentGenderData: {
            gender: "",
            gender_id: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    genders: state => {
        let genderData = state.genders
        return genderData
    },
    currentGender: state => state.currentGenderData,

    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchGenderData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-genders")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setGenderData', response.data.genders);
                        commit('setSuccessMessage', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setErrorMessage', message)
                console.log(message)
            })
    },

    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    selectGender({ commit }, value1, value2) {
        commit('selectGender', value1, value2)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setGenderData(state, items) {
        state.genders = items
    },
    selectGender(state, value1, value2) {
        state.currentAccent.accent      = value1['gender']
        state.currentAccent.gender_id   = value1['id_gender']

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
