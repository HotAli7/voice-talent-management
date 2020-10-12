<template>
    <div id="drag-drop-area" class="fixed z-10 inset-0 overflow-y-auto" v-if="showAddModal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-blue-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 class="text-lg leading-6 font-bold text-blue-700 text-center" id="modal-headline">
                        Add New Talent
                    </h3>
                </div>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <div class="mt-2">
                                <div class="mt-4 flex flex-col justify-center items-center">
                                    <div class="relative w-24 h-24 rounded-full border border-gray-200 overflow-hidden">
                                        <img id="output_avatar" width="200" />
                                        <input type="file"  accept="image/*" name="avatar" id="avatar"  @change="loadAvatar($event)" class="hidden">
                                        <label for="avatar" class="absolute top-0 flex justify-center items-center w-full h-full cursor-pointer bg-gray-300 opacity-0 hover:opacity-75 transition-all duration-300 ease-in-out z-10" ><i class="fa fa-plus text-2xl"></i></label>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <input aria-label="Name" name="name" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Name">
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Gender" name="gender" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5">
                                        <option value="">Gender</option>
                                        <option :value="g.id" v-for="g in gender">{{g.name}}</option>
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Gender" name="gender" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5">
                                        <option value="">Age</option>
                                        <option :value="age.id_age" v-for="age in ageGroup">{{age.age}}</option>
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <select aria-label="Statue" name="statue" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Statue">
                                        <option value="">Status</option>
                                        <option :value="s.id" v-for="s in status">{{s.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="showAddModal=false">
                        Add Talent
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

    export default {
        name: "AddTalent",

        data() {
            return {

            }
        },
        created() {
            this.fetchAgeGroupData();
        },
        destroyed() {
        },
        computed: {
            ...mapGetters('VoiceTalentList', ['showAddModal', 'ageGroup', 'gender', 'status']),
        },
        methods: {
            ...mapActions('VoiceTalentList', ['setModalVisibility', 'fetchAgeGroupData']),
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