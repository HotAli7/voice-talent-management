function initialState() {
    return {
        talents: [],
        medias: [],
        ageGroup: [],
        accents: [],
        languages: [],
        platforms: [],
        styles: [],
        tones: [],
        newMedia: [],
        currentMedia: [],
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
    medias: state => {
        let firstSliceNumber = state.currentPage*state.pageSize+1
        let lastSliceNumber = (state.currentPage+1)*state.pageSize
        let rows = state.medias.slice(firstSliceNumber, lastSliceNumber)
        return rows
    },
    ageGroup:           state => state.ageGroup,
    talents:            state => state.talents,
    accents:            state => state.accents,
    languages:          state => state.languages,
    platforms:          state => state.platforms,
    styles:             state => state.styles,
    tones:              state => state.tones,
    currentMedia:       state => state.currentMedia,
    newMedia:           state => state.newMedia,
    total:              state => state.medias.length,
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

        axios.get("http://localhost:8000/wp-json/vtm/v1/talent-medias")
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        commit('setAll', response.data.medias);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchTalentData({ commit, state }) {

        axios.get("http://localhost:8000/wp-json/vtm/v1/voice-talents")
            .then(
                function(response) {
                    if (response.data.error) {
                        app.errorMsg = response.data.message;
                    }
                    else
                    {
                        commit('setTalents', response.data.talents);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
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
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    selectMedia({ commit }, { value1, value2 }) {
        commit('selectMedia', value1)
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
        state.medias = items
    },
    setTalents(state, items) {
        state.talents = items
    },
    setAgeGroup(state, items) {
        state.ageGroup = items
    },
    selectMedia(state, value1) {
        state.currentMedia = value1
        state.newMedia = value1
        console.log(value1)
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
