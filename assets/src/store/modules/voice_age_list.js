function initialState() {
    return {
        ages: [],
        currentAgeData: {
            age: "",
            age_id: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    ages: state => {
        let ageData = state.ages
        return ageData
    },

    currentAge: state => state.currentAgeData,

    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchAgeData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-age-group")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setAgeData', response.data.age_group);
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
    selectAge({ commit }, value1, value2) {
        commit('selectAge', value1, value2)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAgeData(state, items) {
        state.ages = items
    },
    selectAge(state, value1, value2) {
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
