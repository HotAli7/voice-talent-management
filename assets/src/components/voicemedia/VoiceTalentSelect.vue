<template>
    <div class="space-y-1">
        <label id="listbox-label" class="block text-sm leading-5 font-medium text-gray-700">
            <slot name="SelectLabel"></slot>
        </label>

        <div class="relative" v-click-outside="closeDropdown">
            <span class="inline-block w-full rounded-md shadow-sm">
                <button type="button" @click="openDropdown" aria-haspopup="listbox" aria-expanded="true"
                        aria-labelledby="listbox-label"
                        class="cursor-pointer relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 h-10">
                    <div class="flex items-center space-x-3" v-if="selectedTalent">
                        <img :src="selectedTalent.guid"
                             alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                        <input type="text" id="voice_talent_name" class="block truncate border-0 w-full focus:outline-none focus:ring focus:border-blue-300"  :placeholder="selectedTalent.talent_name" @input="selectTalent" v-if="isOpen" />
                        <span class="block truncate" v-else>
                            {{ selectedTalent.talent_name }} - {{selectedTalent.gender}} - {{selectedTalent.age}}
                        </span>
                    </div>
                    <div class="flex items-center space-x-3" v-else>
                        <img src="/wp-content/plugins/voice-talent-management/profile.png"
                             alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                        <input type="text" class="block truncate border-0 focus:outline-none focus:ring focus:border-blue-300" @input="selectTalent" />
                    </div>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </button>
            </span>
            <div v-show="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3"
                    class="h-48 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                    <li tabindex="0" @click="select(d)" id="listbox-item-0" role="option" v-for="d in talents"
                        v-bind:key="d.id_voice_talent"
                        class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9  cursor-pointer hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">
                        <div class="flex items-center space-x-3">
                            <img :src="d.guid" alt="" class="flex-shrink-0 h-6 w-6 rounded-full"/>
                            <span class="block truncate"
                                  v-bind:class="{ 'font-normal' : !isSelected(d) , 'font-semibold' : isSelected(d)}">
                                {{ d.talent_name }} - {{d.gender}} - {{d.age}}
                            </span>
                        </div>
                        <span v-show="isSelected(d)" class="absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </li>

                    <!-- More options... -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import ClickOutside from 'vue-click-outside'

    export default {
        name: 'VoiceTalentSelect',
        data() {
            return {
                'isOpen': false,
            }
        },
        created() {
            this.fetchTalentData()
        },
        computed: {
            ...mapGetters('VoiceMediaList', ['showAddModal', 'talents', 'currentMedia', 'selectedTalent']),
        },
        methods: {
            ...mapActions('VoiceMediaList', ['fetchTalentData', 'setTalent', 'setSelectedTalent', 'selectVoiceTalent']),
            isSelected(value) {
                return this.selectedTalent === value;
            },
            closeDropdown() {
                this.isOpen = false;
            },
            openDropdown() {
                this.isOpen = true;
            },
            select(value) {
                this.isOpen = false;
                this.setSelectedTalent(value)
                this.setTalent(value)
            },
            selectTalent(e) {
                this.selectVoiceTalent(e.target.value)
            }
        },
        directives: {
            ClickOutside
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
