function initialState() {
    return {
        platforms: [],
        currentPlatform: [],
        newPlatform: {
            id_platform: "",
            platform: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    platforms:            state => state.platforms,
    currentPlatform:      state => state.currentPlatform,
    newPlatform:          state => state.newPlatform,
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
    insertPlatform({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.newPlatform)
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
        axios.post("http://localhost:8000/wp-json/vtm/v1/insert-platform", formData, config)
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
                        dispatch('fetchPlatformData')
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updatePlatform({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.newPlatform)
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
        axios.post("http://localhost:8000/wp-json/vtm/v1/update-platform", formData, config)
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
                        dispatch('fetchPlatformData')
                    }
                })
            .catch(error => {
                console.log(error)
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deletePlatform({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.currentPlatform)
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
        axios.post("http://localhost:8000/wp-json/vtm/v1/delete-platform", formData, config)
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
                        dispatch('fetchPlatformData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    selectPlatform({ commit }, { value1, value2 }) {
        commit('selectPlatform', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    setPlatform({ commit }, value) {
        commit('setPlatform', value)
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
    selectPlatform(state, value) {
        state.currentPlatform = value
        state.newPlatform = value
    },
    setPlatform(state, value) {
        state.newPlatform.platform = value
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
