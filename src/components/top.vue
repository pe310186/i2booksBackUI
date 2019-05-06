<template>
    <v-container>
        <center>
            <font size="4" v-bind:key=item.title v-for="item in list" v-if="item.src==path">{{item.title}}</font>
        </center>
    </v-container>
</template>

<script>
export default {
    props:['path'],
    data(){
        return{
            list:[
                {title:'首頁',src:'homePage'},
                {title:'產品刊登',src:'publish'},
                {title:'產品管理',src:'product'},
                {title:'關於我們',src:'about'},
                {title:'賣二手書',src:'sell'},
                {title:'會員管理',src:'member'},
                {title:'電子報',src:'newsletter'},
                {title:'產品類別管理',src:'type'}
            ]
        }
    },
    beforeMount(){
    }
}
</script>

<style>

</style>
