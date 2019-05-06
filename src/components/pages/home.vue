<template>
    <v-container>
        <top :path="path"></top>
        <v-layout row>
            <v-flex xs2>
                <left></left>
            </v-flex>
            <v-flex xs10>
                <middle :path="path"></middle>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import api from '../../store/api'

export default {
    props:['path'],
    beforeMount(){
        let token=localStorage.getItem('token');
        api.backendCheck(token).catch(error=>{
            this.$router.push('/');
        })
    }
}
</script>

<style>

</style>
