<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div class="flex justify-between">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Tone Information
                </h3>
                <button class="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" @click="updateModalVisibility('showAddModal', true)">Add new Tone
                </button>
            </div>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                Tones of voice talent.
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
                            <tr v-for="tone in tones">
                                <td class="px-6 py-4 whitespace-no-wrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            <div class="text-sm leading-5 font-medium text-gray-900">
                                                {{tone.tone}}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <button @click="selectTone({ value1: tone, value2: 'showEditModal' })" class="pr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"><i class="fa fa-edit pr-2"></i>Edit</button>
                                    <button @click="selectTone({ value1: tone, value2: 'showDeleteModal' })" class="text-red-600 hover:text-red-900 focus:outline-none"><i class="fa fa-trash pr-2"></i>Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <ToneModal />
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex'

    import Alert from "../modal/Alert";
    import ToneModal from "../modal/ToneModal";

    export default {
        name: "Tones",
        components: {
            ToneModal,
            Alert,
        },
        data() {
            return {
            }
        },
        created() {
            this.fetchToneData()
        },
        destroyed() {
            this.resetState()
        },
        computed: {
            ...mapGetters('VoiceToneList', ['tones', 'total', 'errorMsg', 'successMsg']),
        },
        methods: {
            ...mapActions('VoiceToneList', ['fetchToneData', 'resetState', 'setModalVisibility', 'selectTone']),
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