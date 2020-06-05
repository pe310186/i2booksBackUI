<template>
    <v-container>
        <v-card v-if="path=='homePage'" flat>
            <home></home>
        </v-card>
        <v-card v-if="path=='member'" flat>
            <member></member>
        </v-card>
        <v-card v-if="path=='publish'" flat>
            <publish></publish>
        </v-card>
        <v-card v-if="path=='product'" flat>
            <product></product>
        </v-card>
        <v-card v-if="path=='about'" flat>
            <about></about>
        </v-card>
        <v-card v-if="path=='sell'" flat>
            <sell></sell>
        </v-card>
        <v-card v-if="path == 'type'" flat>
            <type></type>
        </v-card>
        <v-card v-if="path == 'order'" flat>
            <order></order>
        </v-card>
        <v-card v-if="path== 'tree'" flat>
            <center>
                <tree></tree>
            </center>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props:['path'],
    beforeMount(){
    }
}
</script>

<style>

</style>
