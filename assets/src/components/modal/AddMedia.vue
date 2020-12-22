<template>
    <div id="drag-drop-area" class="fixed z-10 inset-0 overflow-y-auto" v-if="showAddModal" @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-blue-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 class="text-lg leading-6 font-bold text-blue-700 text-center" id="modal-headline">
                        Add New Media
                    </h3>
                </div>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <div class="mt-2">
                                <div class="mt-4">
                                    <label for="voice-media" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" >Click or Drag Drop to upload the media file</label>
                                    <input aria-label="Name" id="voice-media" name="name" type="file" required class="h-0 overflow-hidden" ref="file" placeholder="Name" @change="updateMedia($event)" >
                                    <li class="flex justify-between text-sm p-1" v-for="file in filelist">
                                        {{file.name}} <button type="button" @click="removeMedia(filelist.indexOf(file))" title="Remove file">Remove File</button>
                                    </li>
                                </div>
                                <div class="mt-4">
                                    <VoiceTalentSelect />
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Accent" name="accent" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" @change="updateAccent($event)">
                                        <option value="">Accent</option>
                                        <option :value="a.id_accent" v-for="a in accents">{{a.accent}}</option>
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Language" name="language" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" @change="updateLanguage($event)">
                                        <option value="">Language</option>
                                        <option :value="l.id_language" v-for="l in languages">{{l.language}}</option>
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Platform" name="platform" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" @change="updatePlatform($event)">
                                        <option value="">Platform</option>
                                        <option :value="p.id_platform" v-for="p in platforms">{{p.platform}}</option>
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Style" name="style" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" @change="updateStyle($event)">
                                        <option value="">Style</option>
                                        <option :value="s.id_style" v-for="s in styles">{{s.style}}</option>
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Tone" name="tone" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" @change="updateTone($event)">
                                        <option value="">Tone</option>
                                        <option :value="t.id_tone" v-for="t in tones">{{t.tone}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="insertMedia()">
                        Add Media
                        </button>
                    </span>
                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="updateModalVisibility('showAddModal', false)">
                        Cancel
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    import VoiceTalentSelect from "../voicemedia/VoiceTalentSelect";

    export default {
        name: "AddMedia",
        components: {
            VoiceTalentSelect,
        },

        data() {
            return {
                filelist: [] // Store our uploaded files
            }
        },
        created() {
            this.fetchAccentData(),
            this.fetchLanguageData(),
            this.fetchPlatformData(),
            this.fetchStyleData(),
            this.fetchToneData()
        },
        destroyed() {
        },
        computed: {
            ...mapGetters('VoiceMediaList', ['showAddModal', 'accents', 'languages', 'platforms', 'styles', 'tones']),
        },
        methods: {
            ...mapActions('VoiceMediaList', ['setModalVisibility', 'fetchAccentData', 'fetchLanguageData', 'fetchPlatformData', 'fetchStyleData', 'fetchToneData', 'insertMedia', 'setMedia', 'unsetMedia', 'setName', 'setAccent', 'setLanguage', 'setPlatform', 'setStyle', 'setTone']),
            updateModalVisibility(modalName, modalValue) {
                let v = {
                    modalName: modalName,
                    modalValue: modalValue,
                }
                this.setModalVisibility(v)
            },
            updateAccent(event) {
                this.setAccent(event.target.value)
            },
            updateLanguage(event) {
                this.setLanguage(event.target.value)
            },
            updatePlatform(event) {
                this.setPlatform(event.target.value)
            },
            updateStyle(event) {
                this.setStyle(event.target.value)
            },
            updateTone(event) {
                this.setTone(event.target.value)
            },
            updateMedia() {
                this.filelist = [...this.$refs.file.files];
                this.setMedia(this.filelist[0])
            },
            removeMedia(i) {
                this.filelist.splice(i, 1);
                this.unsetMedia()
            },
            dragover(event) {
                event.preventDefault();
                // Add some visual fluff to show the user can drop its files
                if (!event.currentTarget.classList.contains('bg-green-300')) {
                    event.currentTarget.classList.add('bg-green-300');
                }
            },
            dragleave(event) {
                // Clean up
                event.currentTarget.classList.remove('bg-green-300');
            },
            drop(event) {
                event.preventDefault();
                this.$refs.file.files = event.dataTransfer.files;
                this.updateMedia(); // Trigger the onChange event manually
                // Clean up
                event.currentTarget.classList.remove('bg-green-300');
            }
        }
    }
</script>

<style scoped>

</style>
