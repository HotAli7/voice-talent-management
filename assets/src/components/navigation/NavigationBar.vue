<template>
    <nav class="bg-gray-300 mb-6">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16 container">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-white focus:text-gray-800 transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex">
                            <router-link :to="{ name:'voicetalent.index' }" class="px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Voice Talents</router-link>
                            <router-link :to="{ name:'voicemedia.index' }" class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Media Library</router-link>
                            <router-link :to="{ name:'setting.index' }" class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Settings</router-link>
                            <a href="#" class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Help</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--
          Mobile menu, toggle classes based on menu state.

          Menu open: "block", Menu closed: "hidden"
        -->
        <div class="block sm:hidden">
            <div class="px-2 pt-2 pb-3">
                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-800 bg-white focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Dashboard</a>
                <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Team</a>
                <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Projects</a>
                <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-gray-800 focus:bg-white transition duration-150 ease-in-out">Calendar</a>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "navigation"
    }
</script>

<style scoped>

</style>