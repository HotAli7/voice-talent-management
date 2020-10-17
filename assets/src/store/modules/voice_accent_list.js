function initialState() {
    return {
        accents: [],
        currentAccent: [],
        newAccent: {
            id_accent: "",
            accent: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    accents:            state => state.accents,
    currentAccent:      state => state.currentAccent,
    newAccent:          state => state.newAccent,
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
    insertAccent({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.newAccent)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        Object.keys(params).forEach(function (key) {
            if(params[key] !== null)
            {
                formData.append(key, params[key]);
            }
        });
        axios.post("http://localhost:8000/wp-json/vtm/v1/insert-accent", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        let v = {
                            modalName: "showAddModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        dispatch('fetchAccentData')
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updateAccent({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.newAccent)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        Object.keys(params).forEach(function (key) {
            if(params[key] !== null)
            {
                formData.append(key, params[key]);
            }
        });
        axios.post("http://localhost:8000/wp-json/vtm/v1/update-accent", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        let v = {
                            modalName: "showEditModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        dispatch('fetchAccentData')
                    }
                })
            .catch(error => {
                console.log(error)
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deleteAccent({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.currentAccent)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        Object.keys(params).forEach(function (key) {
            if(params[key] !== null)
            {
                formData.append(key, params[key]);
            }
        });
        axios.post("http://localhost:8000/wp-json/vtm/v1/delete-accent", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        let v = {
                            modalName: "showDeleteModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        dispatch('fetchAccentData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    selectAccent({ commit }, { value1, value2 }) {
        commit('selectAccent', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    setAccent({ commit }, value) {
        commit('setAccent', value)
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
    selectAccent(state, value) {
        state.currentAccent = value
        state.newAccent = value
    },
    setAccent(state, value) {
        state.newAccent.accent = value
    },
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']
        state[modalName] = modalValue
    },
    setSuccessMessage(state, value) {
        state.successMsg = value
    },
    setErrorMessage(state, value) {
        state.errorMsg = value
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
