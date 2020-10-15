function initialState() {
    return {
        talents: [],
        ageGroup: [],
        newTalent: {
            id: "",
            name: "",
            age: "",
            gender: "",
            status: "",
            avatar: null
        },
        currentTalent: {
            id: "",
            name: "",
            age: "",
            gender: "",
            status: "",
            avatar: null
        },
        gender: [
            { id: "3", name: "Male" },
            { id: "4", name: "Female" },
        ],
        status: [
            { id: "P", name: "Pending / Pause" },
            { id: "L", name: "Live" },
            { id: "D", name: "Dead" },
        ],
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        currentPage: 0,
        pageSize: 10
    }
}

const getters = {
    data: state => {
        let firstSliceNumber = state.currentPage*state.pageSize+1
        let lastSliceNumber = (state.currentPage+1)*state.pageSize
        let rows = state.talents.slice(firstSliceNumber, lastSliceNumber)
        return rows
    },
    ageGroup: state => {
        let ageGroupData = state.ageGroup
        return ageGroupData
    },
    currentTalent:      state => state.currentTalent,
    newTalent:          state => state.newTalent,
    gender:             state => state.gender,
    status:             state => state.status,
    total:              state => state.talents.length,
    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
    currentPage:        state => state.currentPage,
    pageSize:           state => state.pageSize
}

const actions = {
    fetchData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/voice-talents")
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        commit('setAll', response.data.talents);
                    }
                })
            .catch(error => {
                message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchAgeGroupData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-age-group")
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        commit('setAgeGroup', response.data.age_group);
                    }
                })
            .catch(error => {
                message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    insertTalent({ commit, state, dispatch }) {

        let params = _.cloneDeep(state.newTalent)
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
        axios.post("http://localhost:8000/wp-json/vtm/v1/insert-talent", formData, config)
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
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updateTalent({ commit, state, dispatch }) {

        let params = _.cloneDeep(state.newTalent)
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
        axios.post("http://localhost:8000/wp-json/vtm/v1/update-talent", formData, config)
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
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deleteTalent({ commit, state, dispatch }) {

        let params = _.cloneDeep(state.newTalent)
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
        axios.post("http://localhost:8000/wp-json/vtm/v1/delete-talent", formData, config)
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
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    selectTalent({ commit }, { value1, value2 }) {
        commit('selectTalent', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    changePageNumber({ commit }, value) {
        commit('changePageNumber', value)
    },
    setAvatar({ commit }, value) {
        commit('setAvatar', value)
    },
    setName({ commit }, value) {
        commit('setName', value)
    },
    setGender({ commit }, value) {
        commit('setGender', value)
    },
    setAge({ commit }, value) {
        commit('setAge', value)
    },
    setStatus({ commit }, value) {
        commit('setStatus', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAll(state, items) {
        state.talents = items
    },
    setAgeGroup(state, items) {
        state.ageGroup = items
    },
    selectTalent(state, value1) {
        state.currentTalent.id      = value1['id_voice_talent']
        state.currentTalent.name    = value1['talent_name']
        state.currentTalent.age     = value1['talent_age']
        state.currentTalent.gender  = value1['talent_gender']
        state.currentTalent.status  = value1['status']
        state.currentTalent.avatar  = value1['guid']

        state.newTalent.id          = value1['id_voice_talent']
        state.newTalent.name        = value1['talent_name']
        state.newTalent.age         = value1['talent_age']
        state.newTalent.gender      = value1['talent_gender']
        state.newTalent.status      = value1['status']
        state.newTalent.avatar      = value1['guid']
    },
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']

        state[modalName] = modalValue
    },
    changePageNumber(state, value) {
        state.currentPage = value
    },
    setAvatar(state, value) {
        state.newTalent.avatar = value
    },
    setName(state, value) {
        state.newTalent.name = value
    },
    setGender(state, value) {
        state.newTalent.gender = value
    },
    setAge(state, value) {
        state.newTalent.age = value
    },
    setStatus(state, value) {
        state.newTalent.status = value
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
