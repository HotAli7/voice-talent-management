<template>
    <div id="drag-drop-area" class="fixed z-10 inset-0 overflow-y-auto" v-if="showMediaListModal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-blue-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 class="text-lg leading-6 font-bold text-blue-700 text-center" id="modal-headline">
                        Media List of {{currentTalent.name}}
                    </h3>
                </div>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <div class="mt-2">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                    <tr>
                                        <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Platform
                                        </th>
                                        <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Accent
                                        </th>
                                        <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Language
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="media in talent_medias">
                                        <td class="relative px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 text-right">
                                            <audio controls>
                                                <source :src="media.guid" type="audio/mpeg">
                                            </audio>
                                            <a :href="media.guid" target="_blank" class="absolute top-1 right-2 inline-block hover:text-pink-400 transition-all duration-300 cursor-pointer text-xs font-semibold py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">{{media.platform}}</a>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                            {{media.accent}}
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                            {{media.language}}
                                        </td>
                                    </tr>

                                    <!-- More rows... -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="updateModalVisibility('showMediaListModal', false)">
                        Back
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "MediaListModal",

        data() {
            return {

            }
        },
        created() {
        },
        destroyed() {
        },
        computed: {
            ...mapGetters('VoiceTalentList', ['showMediaListModal', 'talent_medias', 'currentTalent']),
        },
        methods: {
            ...mapActions('VoiceTalentList', ['setModalVisibility']),
            updateModalVisibility(modalName, modalValue) {

                let v = {
                    modalName: modalName,
                    modalValue: modalValue,
                }
                this.setModalVisibility(v)
            }
        }
    }
</script>

<style scoped>

</style>
