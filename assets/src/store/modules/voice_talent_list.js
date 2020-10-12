function initialState() {
    return {
        talents: [],
        ageGroup: [],
        newTalent: {
            name: "",
            age: "",
            gender: "",
            status: "",
            avatar: ""
        },
        currentTalent: {
            id: "",
            name: "",
            age: "",
            gender: "",
            status: "",
            avatar: ""
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
                message = error.response.data.message || error.message
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
                message = error.response.data.message || error.message
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
    },
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']

        state[modalName] = modalValue
    },
    changePageNumber(state, value) {
        state.currentPage = value
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
