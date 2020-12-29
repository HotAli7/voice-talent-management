function initialState() {
    return {
        talents: [],
        medias: [],
        mediaAll:[],
        ageGroup: [],
        accents: [],
        languages: [],
        platforms: [],
        styles: [],
        tones: [],
        newMedia: [],
        currentMedia: [],
        selectedTalent: [],
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        currentPage: 0,
        pageSize: 10,
        key: ""
    }
}

const getters = {
    medias: state => {
        let firstSliceNumber = state.currentPage*state.pageSize
        let lastSliceNumber = (state.currentPage+1)*state.pageSize
        let rows = []
        if (state.medias.length != 0)
        {
            rows = state.medias.slice(firstSliceNumber, lastSliceNumber)
        }

        return rows
    },
    mediaAll:           state => state.mediaAll,
    ageGroup:           state => state.ageGroup,
    talents:            state => state.talents,
    accents:            state => state.accents,
    languages:          state => state.languages,
    platforms:          state => state.platforms,
    styles:             state => state.styles,
    tones:              state => state.tones,
    currentMedia:       state => state.currentMedia,
    newMedia:           state => state.newMedia,
    selectedTalent:     state => state.selectedTalent,
    total:              state => state.medias.length,
    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
    currentPage:        state => state.currentPage,
    pageSize:           state => state.pageSize,
    key:                state => state.key
}

const actions = {
    fetchData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-medias")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
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

        axios.get("/wp-json/vtm/v1/voice-talents")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setTalentData', response.data.talents);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchAccentData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-accents")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setAccentData', response.data.accents);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchLanguageData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-languages")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setLanguageData', response.data.languages);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchPlatformData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-platforms")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setPlatformData', response.data.platforms);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchStyleData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-styles")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setStyleData', response.data.styles);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchToneData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/talent-tones")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setToneData', response.data.tones);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    insertMedia({ commit, state, dispatch }) {

        let message = "";
        console.log(state.newMedia)
        if (state.newMedia.media_file == "" || typeof state.newMedia.media_file == "undefined" || !state.newMedia.media_file)
            message = "You must upload Media File! <br />"
        if (state.newMedia.talent_id == "" || typeof state.newMedia.talent_id == "undefined")
            message += "You must select Voice Talent! <br />"
        if (state.newMedia.id_accent == "" || typeof state.newMedia.id_accent == "undefined")
            message += "You must select Accent! <br />"
        if (state.newMedia.id_platform == "" || typeof state.newMedia.id_platform == "undefined")
            message += "You must select Platform! <br />"
        if (state.newMedia.id_language == "" || typeof state.newMedia.id_language == "undefined")
            message += "You must select Language! <br />"
        if (message != "")
        {
            commit('setError', message)
            return;
        }

        let params = state.newMedia

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
        axios.post("/wp-json/vtm/v1/insert-media", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        let v = {
                            modalName: "showAddModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updateMedia({ commit, state, dispatch }) {

        let message = "";
        if (state.newMedia.talent_id == "" || typeof state.newMedia.talent_id == "undefined")
            message += "You must select Voice Talent! <br />"
        if (state.newMedia.id_accent == "" || typeof state.newMedia.id_accent == "undefined")
            message += "You must select Accent! <br />"
        if (state.newMedia.id_platform == "" || typeof state.newMedia.id_platform == "undefined")
            message += "You must select Platform! <br />"
        if (state.newMedia.id_language == "" || typeof state.newMedia.id_language == "undefined")
            message += "You must select Language! <br />"
        if (message != "")
        {
            commit('setError', message)
            return;
        }

        let params = state.newMedia
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
        axios.post("/wp-json/vtm/v1/update-media", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        let v = {
                            modalName: "showEditModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deleteMedia({ commit, state, dispatch }) {

        let params = state.currentMedia
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
        axios.post("/wp-json/vtm/v1/delete-media", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        let v = {
                            modalName: "showDeleteModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                        dispatch('fetchData')
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
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
        commit('selectMedia', value1)
    },
    setSelectedTalent({ commit }, value) {
        commit('setSelectedTalent', value)
    },
    setMedia({ commit }, value) {
        commit('setMedia', value)
    },
    unsetMedia({ commit }) {
        commit('unsetMedia')
    },
    setTalent({ commit }, value) {
        commit('setTalent', value)
    },
    setAccent({ commit }, value) {
        commit('setAccent', value)
    },
    setLanguage({ commit }, value) {
        commit('setLanguage', value)
    },
    setPlatform({ commit }, value) {
        commit('setPlatform', value)
    },
    setStyle({ commit }, value) {
        commit('setStyle', value)
    },
    setTone({ commit }, value) {
        commit('setTone', value)
    },
    changePageNumber({ commit }, value) {
        commit('changePageNumber', value)
    },
    setSearchKey({ commit }, value) {
        commit('setSearchKey', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAll(state, items) {
        state.medias = items
        state.mediaAll = items
    },
    setTalentData(state, items) {
        state.talents = items
        let currentTalentID = state.currentMedia.id_voice_talent
        state.selectedTalent = state.talents.filter( talent => talent.id_voice_talent == currentTalentID)[0]
    },
    setAccentData(state, items) {
        state.accents = items
    },
    setLanguageData(state, items) {
        state.languages = items
    },
    setPlatformData(state, items) {
        state.platforms = items
    },
    setStyleData(state, items) {
        state.styles = items
    },
    setToneData(state, items) {
        state.tones = items
    },
    selectMedia(state, value) {
        state.currentMedia      = value
        state.newMedia          = value
    },
    setSelectedTalent(state, value) {
        state.selectedTalent = value
    },
    setMedia(state, value) {
        state.newMedia.media_file = value
    },
    unsetMedia(state) {
        state.newMedia.media_file = null
    },
    setTalent(state, value) {
        state.newMedia.talent_id = value.id_voice_talent
    },
    setAccent(state, value) {
        state.newMedia.id_accent = value
    },
    setLanguage(state, value) {
        state.newMedia.id_language = value
    },
    setPlatform(state, value) {
        state.newMedia.id_platform = value
    },
    setStyle(state, value) {
        state.newMedia.id_style = value
    },
    setTone(state, value) {
        state.newMedia.id_tone = value
    },
    setModalVisibility(state, value) {
        state.currentMedia = []
        state.newMedia = []
        let modalName = value['modalName']
        let modalValue = value['modalValue']

        state[modalName] = modalValue
    },
    changePageNumber(state, value) {
        state.currentPage = value
    },
    setSearchKey(state, value) {
        state.key = value

        if (state.mediaAll.length != 0)
        {
            state.medias = state.mediaAll.filter(media => {
                if (media.talent_name != null)
                    return media.talent_name.toLowerCase().includes(state.key.toLowerCase())
                else
                    return false
            });
            state.currentPage = 0
        }
    },
    setSuccess(state, value) {
        state.successMsg = value
    },
    setError(state, value) {
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
