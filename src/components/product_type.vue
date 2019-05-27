<template>
    <v-container>
        <v-dialog v-model="dialog[0]" width="600px">
            <v-btn slot="activator" @click="create()">新增</v-btn>
             <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">新增</font></b></center>
                    <v-flex xs6 offset-xs2>
                        <p>第{{n}}層:</p>
                        <v-text-field v-model="type.name" label="*類別名稱" class="input-group--focused"></v-text-field>
                        <div v-bind:key=n v-for="n in this.typeItems.length">
                            <p>第{{n-1}}層:</p>
                            <v-select v-model="type.typeSelected[n-1]" label="類別"  attach v-bind:items="typeItems[n-1]" item-text="name" item-value="id" @change="addSelected(n)" :menu-props="{ overflowY: true, maxHeight:100 }">
                            </v-select>
                        </div>
                    </v-flex>
                    <br>
                    <center>
                        <v-btn @click="createConfirm()">新增</v-btn>  
                    </center>
                    <br>
                </v-card>
        </v-dialog>
        <v-dialog v-model="dialog[1]" v-if="selected.length == 1"  width="600px">
            <v-btn slot="activator" @click="update()">修改</v-btn>
             <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">修改</font></b></center>
                    <v-flex xs6 offset-xs2>
                        <p>第{{n}}層:</p>
                        <v-text-field v-model="type.name" label="*類別名稱" class="input-group--focused"></v-text-field>
                        <div v-bind:key=n v-for="n in this.typeItems.length">
                            <p>第{{n-1}}層:</p>
                            <v-select v-model="type.typeSelected[n-1]" label="類別"  attach v-bind:items="typeItems[n-1]" item-text="name" item-value="id" @change="addSelected(n)" :menu-props="{ overflowY: true, maxHeight:100 }">
                            </v-select>
                        </div>
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
                <td><v-btn @click="detail(props.item.id)">詳細</v-btn></td>
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
            typeItems:[],
            n : 0,
            headers:[
                {text:'編號',align: 'left',sortable: true,value: 'id'},
                {text:'名稱',align: 'left',sortable: false,value: 'name'},
                {text:'詳細',align: 'left',sortable: false,value: 'detail'}
            ],
            types:[],
            dialog:[false,false],
            type:{
                id:'',
                name:'',
                typeSelected:[]
            }
        }
    },
    methods:{
        create(){
            this.type.name=''
            this.type.id = ''
            this.type.typeSelected = []
            this.typeItems.splice(1)
        },
        createConfirm(){
            if(this.type.name !=''){
                let obj = {}
                obj.name = this.type.name
                if(this.type.typeSelected[this.type.typeSelected.length - 1] == -1){
                    this.type.typeSelected.pop()
                }
                obj.super_id = this.type.typeSelected[this.type.typeSelected.length - 1]
                console.log(obj)
                let token = localStorage.getItem('token')
                api.createProductType(token,obj).then(res=>{
                    alert('新增成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('此類別已存在')
                })
            }
        },
        update(){
            this.type.name = this.selected[0].name
            this.type.id = this.selected[0].id
            let superID = this.selected[0].super_id
            let superList = []
            let self  = this
            api.getAllProductType().then(res=>{
                while(superID != 0){
                    superList.push(superID)
                    for(var i in res.data.types){
                        if(res.data.types[i].id == superID){
                            superID = res.data.types[i].super_id
                            break
                        }
                    }
                }
                superList = superList.reverse()
                self.type.typeSelected = superList
                self.n = self.type.typeSelected.length
                for(var i in superList){
                        let selectedList = [{name:'未選擇',id:-1}]
                        for(var j in res.data.types){
                            if(res.data.types[j].super_id == superList[i]){
                                selectedList.push(res.data.types[j])
                                console.log(res.data.types[j])
                            }
                        }
                        self.typeItems.push(selectedList)
                }
                console.log(self.type)
            })
        },
        updateConfirm(){
            if(this.type.name!= ''){
                let token = localStorage.getItem('token')
                console.log(this.type)
                api.updateProductType(token,this.type.id,this.type).then(res=>{
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
        },
        detail(id){

        },
        addtype(){
            this.type.typeItems.push('')
        },
        deleteType(index){
            this.type.typeItems.splice(index,1)
        },
        addSelected(index){
            this.n = index
            this.typeItems.splice(index)
            this.type.typeSelected.splice(index)
            let self = this
            if(this.type.typeSelected[index-1] != -1){
                api.getProductType(this.type.typeSelected[index-1]).then(res=>{
                    let types = res.data.types
                    let obj = {
                        name:'未選擇',
                        id:'-1',
                    }
                    types.splice(0,0,obj)
                    self.typeItems.push(types)
                }).catch(error=>{
                })
            }
            else{
                this.n = index-1
            }
        }
    },
    beforeMount(){
        let self = this

        api.getProductType(0).then(res=>{
            let types = res.data.types
            let obj = {
                name:'未選擇',
                id:'-1',
            }
            types.splice(0,0,obj)
            self.typeItems.push(types)
            console.log(self.typeItems)
        }).catch(error=>{
        })

        api.getAllProductType().then(res=>{
            self.types = res.data.types
        })
    }
}
</script>

<style>

</style>
