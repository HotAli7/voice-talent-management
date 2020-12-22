<template>
    <!-- ALERT COMPONENT -->
    <div class="container">
        <div class="bg-red-100 border border-red-400 text-red-700 rounded px-4 py-3 rounded relative my-5" role="alert" v-if="errorMsg">
            <strong class="font-bold">Error</strong>
            <span class="block sm:inline" v-html="errorMsg"></span>
        </div>
        <div class="bg-blue-100 border border-blue-400 text-blue-700 rounded px-4 py-3 rounded relative my-5" role="alert" v-if="successMsg">
            <strong class="font-bold">Success</strong>
            <span class="block sm:inline" v-html="successMsg"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: ['errorMsg', 'successMsg']
    }
</script>

<style scoped>

</style>
