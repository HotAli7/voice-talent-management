function initialState() {
    return {
        styles: [],
        currentStyle: [],
        newStyle: {
            id_style: "",
            style: ""
        },
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
    }
}

const getters = {
    styles:            state => state.styles,
    currentStyle:      state => state.currentStyle,
    newStyle:          state => state.newStyle,
    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
}

const actions = {
    fetchStyleData({ commit, state }) {
        axios.get("/wp-json/vtm/v1/talent-styles")
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
    insertStyle({ commit, state, dispatch }) {
        let params = state.newStyle
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
        axios.post("/wp-json/vtm/v1/insert-style", formData, config)
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
                        dispatch('fetchStyleData')
                    }
                })
            .catch(error => {
                let message = error.response.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updateStyle({ commit, state, dispatch }) {
        let params = state.newStyle
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
        axios.post("/wp-json/vtm/v1/update-style", formData, config)
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
                        dispatch('fetchStyleData')
                    }
                })
            .catch(error => {
                console.log(error)
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deleteStyle({ commit, state, dispatch }) {
        let params = state.currentStyle
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
        axios.post("/wp-json/vtm/v1/delete-style", formData, config)
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
                        dispatch('fetchStyleData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    selectStyle({ commit }, { value1, value2 }) {
        commit('selectStyle', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    setStyle({ commit }, value) {
        commit('setStyle', value)
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
    selectStyle(state, value) {
        state.currentStyle = value
        state.newStyle = value
    },
    setStyle(state, value) {
        state.newStyle.style = value
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
