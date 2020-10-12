<template>
    <div>
        <NavigationBar/>
        <!-- DISPLAY TALENTS -->
        <router-view></router-view>
    </div>
</template>

<script>
    import NavigationBar from "./components/navigation/NavigationBar";

    export default {
        name: "App",
        components: {
            NavigationBar
        },
        data: function () {
            return {
            }
        }
    }
</script>

<style scoped>

</style>