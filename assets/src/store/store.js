import Vue from "vue";
import Vuex from "vuex";

import VoiceTalentList from './modules/voice_talent_list';
import VoiceMediaList from './modules/voice_media_list';
import VoiceAccentList from './modules/voice_accent_list';
import VoiceAgeList from './modules/voice_age_list';
import VoiceGenderList from './modules/voice_gender_list';
import VoiceLanguageList from './modules/voice_language_list';
import VoicePlatformList from './modules/voice_platform_list';
import VoiceStyleList from './modules/voice_style_list';
import VoiceToneList from './modules/voice_tone_list';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        VoiceTalentList,
        VoiceMediaList,
        VoiceAccentList,
        VoiceAgeList,
        VoiceGenderList,
        VoiceLanguageList,
        VoicePlatformList,
        VoiceStyleList,
        VoiceToneList
    },
});