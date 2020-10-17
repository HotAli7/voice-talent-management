<template>
    <div class="container my-5">
        <div class="flex justify-between items-center mb-6 px-6 container">
            <h3 class="text-blue-600 text-xl font-bold py-2 px-4 m-2">Setting</h3>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                (Accents, Ages, Genders, Languages, Platforms, Styles, Tones)
            </p>
        </div>
        <hr class="bg-blue-500 mb-6">

        <div class="mt-10">
            <ul class="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <li>
                    <Accents/>
                </li>
                <li class="mt-10 md:mt-0">
                    <Languages/>
                </li>
                <li class="mt-10 md:mt-0">
                    <Platforms/>
                </li>
                <li class="mt-10 md:mt-0">
                    <Ages/>
                </li>
                <li class="mt-10 md:mt-0">
                    <Styles/>
                </li>
                <li class="mt-10 md:mt-0">
                    <Tones/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Accents from "./Accents";
    import Ages from "./Ages";
    import Genders from "./Genders";
    import Languages from "./Languages";
    import Platforms from "./Platforms";
    import Styles from "./Styles";
    import Tones from "./Tones";

    export default {
        name: "Setting",
        components: {
            Accents,
            Ages,
            Genders,
            Languages,
            Platforms,
            Styles,
            Tones
        },
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

</style>