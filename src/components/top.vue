<template>
    <v-container>
        <center>
            <div v-bind:key=item.title v-for="item in list">
                <font size="4" v-if="item.src==path">{{item.title}}</font>
            </div>
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
                {title:'產品類別',src:'type'},
                {title:'訂單管理',src:'order'},
            ]
        }
    },
    beforeMount(){
    }
}
</script>

<style>

</style>
