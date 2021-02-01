<template>
    <!-- ALERT COMPONENT -->
    <div class="container">
        <div class="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 rounded px-4 py-3 rounded relative my-5" role="alert" v-if="errorMsg">
            <strong class="font-bold">Error</strong>
            <span class="block sm:inline" v-html="errorMsg"></span>
            <div class="modal-close cursor-pointer z-50" @click="hideMessage"><svg class="fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path></svg></div>
        </div>
        <div class="flex justify-between items-center bg-blue-100 border border-blue-400 text-blue-700 rounded px-4 py-3 rounded relative my-5" role="alert" v-if="successMsg">
            <strong class="font-bold">Success</strong>
            <span class="block sm:inline" v-html="successMsg"></span>
            <div class="modal-close cursor-pointer z-50" @click="hideMessage"><svg class="fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path></svg></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: ['errorMsg', 'successMsg'],
        methods: {
            hideMessage() {
                this.$store.state.VoiceTalentList.errorMsg = false
                this.$store.state.VoiceTalentList.successMsg = false
                this.$store.state.VoiceMediaList.errorMsg = false
                this.$store.state.VoiceMediaList.successMsg = false
            }
        }
    }
</script>

<style scoped>

</style>
