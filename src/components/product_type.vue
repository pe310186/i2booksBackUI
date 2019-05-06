<template>
    <v-container>
        <v-dialog v-model="dialog[0]" width="400px">
            <v-btn slot="activator" @click="create()">新增</v-btn>
             <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">新增</font></b></center>
                    <v-flex xs6 offset-xs3>
                        <v-text-field v-model="type.name" label="*類別名稱" class="input-group--focused"></v-text-field>
                    </v-flex>
                    <br>
                    <center>
                        <v-btn @click="createConfirm()">新增</v-btn>  
                    </center>
                    <br>
                </v-card>
        </v-dialog>
        <v-dialog v-model="dialog[1]" v-if="selected.length == 1"  width="400px">
            <v-btn slot="activator" @click="update()">修改</v-btn>
             <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">修改</font></b></center>
                    <v-flex xs6 offset-xs3>
                        <v-text-field v-model="type.name" label="*類別名稱" class="input-group--focused"></v-text-field>
                    </v-flex>
                    <br>
                    <center>
                        <v-btn @click="updateConfirm()">修改</v-btn>  
                    </center>
                    <br>
                </v-card>
        </v-dialog>
         <v-dialog v-model="dialog[2]" v-if="selected.length != 0"  width="400px">
            <v-btn slot="activator" @click="deleteType()">刪除</v-btn>
             <v-card>
                    <br>
                    <center><b><font size="4">確認刪除?</font></b></center>
                    <br>
                    <center>
                        <v-btn @click="deleteConfirm()">刪除</v-btn>  
                    </center>
                    <br>
                </v-card>
        </v-dialog>
        <v-data-table
        :headers="headers"
        :items="types"
        :search="search"
        v-model="selected"
        item-key="id"
        select-all
        :pagination.sync="pagination"
        class="elevation-1"
        >
            <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                    <span slot="activator">
                    {{ props.header.text }}
                    </span>
                    <span>
                    {{ props.header.text }}
                    </span>
                </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
                <td>
                    <v-checkbox
                    v-model="props.selected"
                    primary
                    hide-details
                    ></v-checkbox>
                </td>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td> 
            </template>
        </v-data-table>
    </v-container>
</template>

<script>

import api from './../store/api.js'

export default {
    data(){
        return {
            pagination:{
                sortBy: 'id',
                rowsPerPage: 10
            },
            search:'',
            selected:[],
            headers:[
                {text:'編號',align: 'left',sortable: true,value: 'id'},
                {text:'名稱',align: 'left',sortable: false,value: 'name'},
            ],
            types:[],
            dialog:[false,false],
            type:{
                id:'',
                name:'',
            }
        }
    },
    methods:{
        create(){
            this.type.name=''
        },
        createConfirm(){
            if(this.type.name !=''){
                let token = localStorage.getItem('token')
                api.createProductType(token,this.type.name).then(res=>{
                    alert('新增成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('此類別已存在')
                })
            }
        },
        update(){
            this.type.id = this.selected[0].id
            this.type.name = this.selected[0].name
        },
        updateConfirm(){
            if(this.type.name!= ''){
                let token = localStorage.getItem('token')
                console.log(this.type.id)
                console.log(this.type.name)
                api.updateProductType(token,this.type.id,this.type.name).then(res=>{
                    alert('修改成功')
                    window.location.reload()
                }).catch(error=>{
                    alert('修改失敗')
                })
            }
        },
        deleteConfirm(){
            var ids=[];
            for(var i in this.selected){
                ids[i]=this.selected[i].id;
            }
            let token = localStorage.getItem('token')
            api.deleteType(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            })
        }
    },
    beforeMount(){
        let self = this
        api.getProductType().then(res=>{
            self.types = res.data.types
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
