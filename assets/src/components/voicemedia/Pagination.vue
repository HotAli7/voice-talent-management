<template>

    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
            <a @click="goToPage(displayPageNumber['prevPage'])" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" v-if="displayPageNumber['prevPage']">
                Previous
            </a>
            <a @click="goToPage(displayPageNumber['nextPage'])" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" v-if="displayPageNumber['nextPage']">
                Next
            </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm leading-5 text-gray-700">
                    Showing
                    <span class="font-medium">{{currentPage*pageSize+1}}</span>
                    to
                    <span class="font-medium">{{(currentPage+1)*pageSize}}</span>
                    of
                    <span class="font-medium">{{total}}</span>
                    results
                </p>
            </div>
            <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                    <a @click="goToPage(displayPageNumber['prevPage'])" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 cursor-pointer focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous" v-if="displayPageNumber['prevPage'] != false">
                        <!-- Heroicon name: chevron-left -->
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a @click="goToPage(pageNumber)" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 cursor-pointer focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" v-for="pageNumber in displayPageNumber['pageNumbers']">
                        {{pageNumber+1}}
                    </a>
                    <a @click="goToPage(displayPageNumber['nextPage'])" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 cursor-pointer focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next" v-if="displayPageNumber['nextPage']">
                        <!-- Heroicon name: chevron-right -->
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </nav>
            </div>
        </div>
    </div>

</template>

<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Pagination",

        data() {
            return {
            }
        },
        destroyed() {
        },
        computed: {
            ...mapGetters('VoiceMediaList', ['total', 'currentPage', 'pageSize']),
            displayPageNumber() {
                let displayPageNumber = new Array()
                let i

                displayPageNumber['prevPage'] = false
                displayPageNumber['nextPage'] = false
                displayPageNumber['pageNumbers'] = new Array()
                let index = 0;
                for (i=(this.currentPage-2); i<(this.currentPage+3); i++)
                {
                    if (i<0 || i>(this.total/this.pageSize))
                        continue
                    if ((this.currentPage - 1) >= 0)
                        displayPageNumber['prevPage'] = this.currentPage - 1
                    if((this.currentPage + 1) < (this.total/this.pageSize))
                        displayPageNumber['nextPage'] = this.currentPage + 1

                    displayPageNumber['pageNumbers'][index] = i
                    index++
                }
                return displayPageNumber
            }
        },
        methods: {
            ...mapActions('VoiceMediaList', ['changePageNumber']),
            goToPage(pageNumber) {
                this.changePageNumber(pageNumber)
            }
        }
    }
</script>

<style scoped>

</style>