<template>
    <v-container>
        <v-layout column>
            <v-btn v-bind:key=item.title v-for="item in list" @click="changeRoute(item.src)">{{item.title}}</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'首頁',src:'homePage'},
                {title:'關於我們',src:'about'},
                {title:'產品刊登',src:'publish'},
                {title:'產品類別管理',src:'type'},
                //{title:'類別樹狀圖',src:'tree'},
                {title:'產品管理',src:'product'},
                {title:'賣二手書',src:'sell'},
                {title:'會員管理',src:'member'},
                //{title:'電子報',src:'newsletter'},
                {title:'訂單管理',src:'order'},
            ]
        }
    },
    methods:{
        changeRoute(src){
            this.$router.push('/home/'+src)
        }
    },
    beforeMount(){

    }
}
</script>

<style>

</style>
