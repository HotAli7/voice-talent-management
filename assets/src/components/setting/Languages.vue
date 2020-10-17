<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div class="flex justify-between">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Language Information
                </h3>
                <button class="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" @click="updateModalVisibility('showAddModal', true)">Add new Language
                </button>
            </div>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                Languages of voice talent.
            </p>
        </div>

        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th class="px-6 py-3 bg-gray-100"></th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="language in languages">
                                <td class="px-6 py-4 whitespace-no-wrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            <div class="text-sm leading-5 font-medium text-gray-900">
                                                {{language.language}}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <button @click="selectLanguage({ value1: language, value2: 'showEditModal' })" class="pr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"><i class="fa fa-edit pr-2"></i>Edit</button>
                                    <button @click="selectLanguage({ value1: language, value2: 'showDeleteModal' })" class="text-red-600 hover:text-red-900 focus:outline-none"><i class="fa fa-trash pr-2"></i>Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <LanguageModal />
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex'

    import Alert from "../modal/Alert";
    import LanguageModal from "../modal/LanguageModal";

    export default {
        name: "Languages",
        components: {
            LanguageModal,
            Alert,
        },
        data() {
            return {
            }
        },
        created() {
            this.fetchLanguageData()
        },
        destroyed() {
            this.resetState()
        },
        computed: {
            ...mapGetters('VoiceLanguageList', ['languages', 'total', 'errorMsg', 'successMsg']),
        },
        methods: {
            ...mapActions('VoiceLanguageList', ['fetchLanguageData', 'resetState', 'setModalVisibility', 'selectLanguage']),
            updateModalVisibility(modalName, modalValue, talentID=0) {
                let v = {
                    modalName: modalName,
                    modalValue: modalValue,
                    talentID: talentID
                }
                this.setModalVisibility(v)
            }
        }
    }
</script>

<style scoped>

</style>