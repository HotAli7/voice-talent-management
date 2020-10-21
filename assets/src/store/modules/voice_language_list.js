function initialState() {
    return {
        languages: [],
        currentLanguage: [],
        newLanguage: {
            id_language: "",
            language: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    languages:            state => state.languages,
    currentLanguage:      state => state.currentLanguage,
    newLanguage:          state => state.newLanguage,
    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchLanguageData({ commit, state }) {
        axios.get("/wp-json/vtm/v1/talent-languages")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setErrorMessage', response.data.message);
                    }
                    else
                    {
                        commit('setLanguageData', response.data.languages);
                        commit('setSuccessMessage', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setErrorMessage', message)
                console.log(message)
            })
    },
    insertLanguage({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.newLanguage)
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
        axios.post("/wp-json/vtm/v1/insert-language", formData, config)
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
                        dispatch('fetchLanguageData')
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updateLanguage({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.newLanguage)
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
        axios.post("/wp-json/vtm/v1/update-language", formData, config)
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
                        dispatch('fetchLanguageData')
                    }
                })
            .catch(error => {
                console.log(error)
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deleteLanguage({ commit, state, dispatch }) {
        let params = _.cloneDeep(state.currentLanguage)
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
        axios.post("/wp-json/vtm/v1/delete-language", formData, config)
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
                        dispatch('fetchLanguageData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    selectLanguage({ commit }, { value1, value2 }) {
        commit('selectLanguage', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    setLanguage({ commit }, value) {
        commit('setLanguage', value)
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setLanguageData(state, items) {
        state.languages = items
    },
    selectLanguage(state, value) {
        state.currentLanguage = value
        state.newLanguage = value
    },
    setLanguage(state, value) {
        state.newLanguage.language = value
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
