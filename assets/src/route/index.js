import Vue from 'vue'
import VueRouter from 'vue-router'

import VoiceTalentList from "../components/voicetalent/VoiceTalentList";
import VoiceMediaList from "../components/voicemedia/VoiceMediaList";
import Setting from "../components/setting/Setting";

Vue.use(VueRouter)

const routes = [
    { path: 'voicetalent', component: VoiceTalentList, name: 'voicetalent.index' },
    { path: 'voicemedia', component: VoiceMediaList, name: 'voicemedia.index' },
    { path: 'setting', component: Setting, name: 'setting.index'}
    ]

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes,
    linkActiveClass: "bg-white focus:outline-none focus:text-gray-800 focus:bg-white"
})