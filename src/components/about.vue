<template>
    <v-container>
        <editorbar v-model = "editor.info" :isClear = "isClear" @change="change"></editorbar>
        <br>
        <v-layout justify-center>
            <v-btn>儲存</v-btn>
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
            console.log(this.editor.info)
            let token = localStorage.getItem('token')
            api.updateArticle(token,this.editor.info).then(res=>{
                alert('儲存成功')
                window.location.reload()
            }).catch(error=>{
                alert('操作逾時')
            })
        }
    },
    beforeMount(){
        // api.getArticle(1).then(res=>{
        //     this.editor.info = res.data.article.content
        // })
    }
}
</script>
<style>
</style>