<template>
    <div class="container my-5">
        <div class="flex justify-between mb-6 px-6 container">
            <h3 class="text-blue-600 text-xl font-bold py-2 px-4 m-2 w-2/5">Registered Talents</h3>
            <div class="sm:ml-6 flex items-end w-3/5 py-2 px-4 m-2">
                <input data-v-57d7188b="" aria-label="Search" name="key" type="text" required="required" placeholder="Search" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 w-3/5" :value="key" @change="updateSearchKey($event)">
                <button class="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded w-2/5 ml-6" @click="updateModalVisibility('showAddModal', true)">
                    <i class="fa fa-user"></i><span class="ml-2 uppercase">add new talent</span>
                </button>
            </div>
        </div>
        <hr class="bg-blue-500 mb-6">
        <Alert :errorMsg="errorMsg" :successMsg="successMsg" />
        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <VoiceTalentHeader/>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="talent in data">
                                    <td class="px-6 py-4 whitespace-no-wrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-10 w-10 rounded-full" :src=talent.guid alt="">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm leading-5 font-medium text-gray-900">
                                                    {{talent.talent_name}}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {{talent.gender}}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {{talent.age}}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                      {{talent.status}}
                                                    </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                        <button @click="selectTalent({ value1: talent, value2: 'showEditModal' })" class="pr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"><i class="fa fa-edit pr-2"></i>Edit</button>
                                        <button @click="selectTalent({ value1: talent, value2: 'showDeleteModal' })" class="text-red-600 hover:text-red-900 focus:outline-none"><i class="fa fa-trash pr-2"></i>Delete</button>
                                    </td>
                                </tr>

                            <!-- More rows... -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Pagination/>
        <AddTalentModal />
        <EditTalentModal />
        <DeleteTalentModal />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import VoiceTalentHeader from "./VoiceTalentHeader";
    import Pagination from "../voicetalent/Pagination";
    import Alert from "../modal/Alert";
    import AddTalentModal from "../modal/AddTalent";
    import EditTalentModal from "../modal/EditTalent";
    import DeleteTalentModal from "../modal/DeleteTalent";

    export default {
        name: "VoiceTalent",
        components: {
            VoiceTalentHeader,
            Pagination,
            Alert,
            AddTalentModal,
            EditTalentModal,
            DeleteTalentModal
        },
        data() {
            return {
            }
        },
        created() {
            this.fetchData()
        },
        destroyed() {
            this.resetState()
        },
        computed: {
            ...mapGetters('VoiceTalentList', ['data', 'total', 'errorMsg', 'successMsg', 'currentPage', 'pageSize', 'key']),
        },
        methods: {
            ...mapActions('VoiceTalentList', ['fetchData', 'resetState', 'setModalVisibility', 'selectTalent', 'setSearchKey']),
            updateModalVisibility(modalName, modalValue) {
                let v = {
                        modalName: modalName,
                        modalValue: modalValue
                    }
                this.setModalVisibility(v)
            },
            updateSearchKey(event)
            {
                this.setSearchKey(event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>