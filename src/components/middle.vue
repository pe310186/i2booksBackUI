<template>
    <v-container>
        <v-card v-if="path=='homePage'" flat>
            <home></home>
        </v-card>
        <v-card v-if="path=='member'" flat>
            <member></member>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props:['path']
}
</script>

<style>

</style>
