<template>
    <v-container>
        <TreeChart :json="treeData"/>
    </v-container>
</template>

<script>
import TreeChart from "vue-tree-chart"
import api from '../store/api.js'
export default {

    components:{
        TreeChart
    },
    data(){
        return{
            types:[],
            treeData:{
                name:"無",
                id: 0,
                children:[]               
            }
        }
    },
    methods:{
        treeGen()
        {
            this.treeData.children = this.getSubTree(0)
        },
        getSubTree(superTypeID)
        {
            let subTree = []
            for(var i in this.types){
                if(this.types[i].super_id == superTypeID){
                    let obj = {
                    }
                    obj.name = this.types[i].name
                    obj.id = this.types[i].id
                    subTree.push(obj)
                }
            }

            if(subTree.length!=0){
                for(var i in subTree){
                    subTree[i].children = this.getSubTree(subTree[i].id)
                }
                return subTree
            }
        }
    },
    beforeMount(){
        let self = this
        api.getAllProductType().then(res=>{
            self.types = res.data.types
            self.treeGen()
        })
    }
}
</script>

<style>

</style>
