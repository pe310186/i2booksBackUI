<template>
    <v-container>
        <a target="_blank" href="/#/home/tree"><v-btn>樹狀圖</v-btn></a>
        <v-dialog v-model="dialog[0]" width="600px">
            <v-btn slot="activator" @click="create()">新增</v-btn>
             <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">新增</font></b></center>
                    <center>
                    <v-flex xs6>
                        <v-text-field v-model="type.name" label="*類別名稱" class="input-group--focused" :error-messages="errorMessage[0]"></v-text-field>
                        <v-select v-model="type.super_id" attach label="父類別" :items="typeItems" item-text="name" item-value="id"  max-height="150" dense></v-select>
                    </v-flex>
                    </center>
                    <br>
                    <center>
                        <v-btn @click="createConfirm()">新增</v-btn>  
                    </center>
                    <br>
                    <br>
                    <br>
                </v-card>
        </v-dialog>
        <v-dialog v-model="dialog[1]" v-if="selected.length == 1"  width="600px">
            <v-btn slot="activator" @click="update()">修改</v-btn>
             <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">修改</font></b></center>
                    <center>
                    <v-flex xs6>
                        <v-text-field v-model="type.name" label="*類別名稱" class="input-group--focused"></v-text-field>
                        <p>父類別:</p>
                        <v-select attach="" label="類別名稱" v-model="type.super_id" max-height="150" :items=typeItems item-text="name" item-value="id" dense></v-select>
                    </v-flex>
                    </center>
                    <br>
                    <center>
                        <v-btn @click="updateConfirm()">修改</v-btn>  
                    </center>
                    <br>
                    <br>
                    <br>
                </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" width="500px">
            <v-card>
                <br>
                <br>
                <center><b><font size="4" color="red">*請注意!!!若刪除的類別有子類別則會往上合併</font><br><font size="4">確認刪除?</font></b></center>
                <br>
                <center>
                    <v-btn @click="deleteConfirm()">刪除</v-btn>  
                </center>
                <br>
                <br>
            </v-card>
        </v-dialog>
        <br>
        <br>
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
                <td><v-btn @click="deleteType(props.item.id)" @click.stop="deleteDialog = true">刪除</v-btn></td>
            </template>
        </v-data-table>
        <!---
        <v-dialog v-model="treeDialog" fullscreen>
            <v-card flat>
                <center>
                    <br>
                    <p><b><font size="4">樹狀結構圖</font></b></p>    
                    <tree></tree>
                    <v-btn @click="treeDialog = false">關閉</v-btn>
                    <br>
                    <br>
                </center>
            </v-card>
        </v-dialog>
        --->
    </v-container>
</template>

<script>
import api from './../store/api.js'

export default {
    props:['path'],
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
                {text:'',align: 'left',sortable: true,value: 'delete'}, 
            ],
            types:[],
            dialog:[false,false,false],
            treeDialog: false,
            deleteDialog: false,
            type:{
                id:'',
                name:'',
                super_id:'',
            },
            allTypeItems:[],
            typeItems:[],
            errorMessage:[''],
        }
    },
    watch:{
        'type.name' (newName,oldName){
            var flag = false
            for(var i in this.allTypeItems){
                if(newName == this.allTypeItems[i].name){
                    this.errorMessage[0] = '此類別名稱已存在'
                    flag = true
                    break
                }
            }
            if(!flag)
            this.errorMessage[0] = ''
        }
    },
    methods:{
        create(){
            this.type.name=''
            this.type.id = ''
            this.typeItems = this.allTypeItems
            this.type.super_id = 0
        },
        createConfirm(){
            if(this.type.name !=''){
                let obj = {}
                obj.super_id = this.type.super_id // superID
                obj.name = this.type.name
                for(var i in this.types){
                    if(this.types[i].name == obj.name){
                        alert('此類別名稱已存在')
                        return;
                    }
                }
                let token = localStorage.getItem('token')
                api.createProductType(token,obj).then(res=>{
                    alert('新增成功')
                    window.location.reload();
                }).catch(error=>{
                    alert('此類別已存在')
                })
            }
            else
                alert('類別名稱不可為空')
        },
        getSuperType(typeID){
            let retType = this.allTypeItems
            let subType = this.getSubType(typeID)
            for(var i in subType){
                retType.splice(retType.indexOf(subType[i]),1)
            }
            for(var i in retType){
                if(retType[i].id == typeID){
                    retType.splice(i,1)
                    break
                }
            }
            return retType
        },
        getSubType(typeID){    
            let subType = []
            for(var i in this.allTypeItems){
                if(this.allTypeItems[i].super_id == typeID){
                    subType.push(this.allTypeItems[i])
                }
            }

            if(subType.length!=0){
                let tmpSubType = []
                for(var i in subType){
                    let tmpType = this.getSubType(subType[i].id)
                    tmpSubType  = tmpSubType.concat(tmpType)
                }
                subType = subType.concat(tmpSubType)
            }
            return subType
        },
        update(){
            this.type.name = this.selected[0].name
            this.type.id = this.selected[0].id
            this.type.super_id = this.selected[0].super_id
            this.typeItems  = this.getSuperType(this.type.id)
        },
        updateConfirm(){
            if(this.type.name!= ''){
                let token = localStorage.getItem('token')
                let obj = {}
                obj.name = this.type.name
                obj.super_id = this.type.super_id
                 api.updateProductType(token,this.type.id,obj).then(res=>{
                    alert('修改成功')
                    window.location.reload()
                }).catch(error=>{
                    alert('修改失敗')
                })
            }
        },
        deleteType(index){
            this.deleteDialog = true
            this.type.id = index
        },
        deleteConfirm(){
            // var ids=[];
            // for(var i in this.selected){
            //     ids[i]=this.selected[i].id;
            // }

            let token = localStorage.getItem('token')
            api.deleteType(token,this.type.id).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            })
        },
    },
    beforeMount(){
        let self = this
        api.getAllProductType().then(res=>{
            self.allTypeItems = res.data.types
            self.types = []
            self.types = self.types.concat(res.data.types)
            let obj = {
                id:0,
                name:"無"
            }
            self.allTypeItems.splice(0,0,obj)
            console.log(self.allTypeItems)
        })
    }
}
</script>

<style>

</style>
