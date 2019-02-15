<template>
    <v-container>
    </v-container>
</template>

<script>
import api from '../../store/api'

export default {
    beforeMount(){
        let token=localStorage.getItem('token');
        console.log(token)
        api.checkAccount(token).catch(error=>{
            this.$router.push('/');
        })
    }
}
</script>

<style>

</style>
