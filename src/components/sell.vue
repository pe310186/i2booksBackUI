<template>
    <v-container>
        <editorbar v-model = "editor.info" :isClear = "isClear" @change="change"></editorbar>
        <br>
        <v-layout justify-center>
            <v-btn @click="save()">儲存</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data() {
        return {
            editor:{
                info:'',
            },
            isClear:false
        }
    },
    watch:{
    },
    methods: {
        change(val){
            this.editor.info = val
        },
        save(){
            let token = localStorage.getItem('token')
            api.updateArticle(token,2,this.editor.info).then(res=>{
                alert('儲存成功')
                window.location.reload()
            }).catch(error=>{
                alert('操作逾時')
            })
        }
    },
    beforeMount(){
        let self = this
         api.getArticle(2).then(res=>{
            self.editor.info = res.data.article.content
         }).catch(error=>{

         })
    }
}
</script>
<style>
</style>