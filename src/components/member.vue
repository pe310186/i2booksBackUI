<template>
    <v-container>
        <v-layout row>
            <v-dialog v-model="dialog[0]" width="600">
                <v-btn slot="activator" @click="createAccount()">新增</v-btn>
                <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">新增</font></b></center>
                    <v-flex xs6 offset-xs3>
                        <v-text-field v-model="account.name" label="*名稱" class="input-group--focused"></v-text-field>
                        <v-text-field v-model="account.account" label="*帳號" class="input-group--focused" :error-messages="errorMessages[0]"></v-text-field>
                        <v-text-field v-model="account.password" label="*密碼" class="input-group--focused"></v-text-field>
                        <v-select attach :items="level" label="權限等級" max-height="150" offset-y light v-model="account.level"></v-select>
                        <v-text-field v-model="account.email" label="*信箱" class="input-group--focused" :error-messages="errorMessages[1]"></v-text-field>
                        <v-text-field v-model="account.cellphone" label="手機" class="input-group--focused"></v-text-field>
                        <v-text-field v-model="account.address" label="地址" class="input-group--focused"></v-text-field>
                    </v-flex>
                    <br>
                    <center>
                        <v-btn @click="createConfirm()">新增</v-btn>  
                    </center>
                    <br>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog[1]" width="600" v-if="selected.length==1">
                <v-btn slot="activator" @click="update()">修改</v-btn>
                <v-card>
                    <br>
                    <br>
                    <center><b><font size="4">修改</font></b></center>
                    <v-flex xs6 offset-xs3>
                        <v-text-field v-model="account.name" label="名稱" class="input-group--focused"></v-text-field>
                        <v-text-field v-model="account.password" label="密碼" class="input-group--focused"></v-text-field>
                        <v-select attach :items="level" label="權限等級" max-height="150" offset-y light v-model="account.level"></v-select>
                        <v-text-field v-model="account.email" label="信箱" class="input-group--focused"></v-text-field>
                        <v-text-field v-model="account.cellphone" label="手機" class="input-group--focused"></v-text-field>
                        <v-text-field v-model="account.address" label="地址" class="input-group--focused"></v-text-field>
                    </v-flex>
                    <br>
                    <center><v-btn @click="updateConfirm()">修改</v-btn></center>
                    <br>
                </v-card>
            </v-dialog>
            <v-btn @click="deleteAccount()" v-if="selected.length>=1">刪除</v-btn>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" label="搜尋" class="input-group--focused"></v-text-field>
            <v-spacer></v-spacer>
        </v-layout>
        <br>
        <v-data-table
        :headers="headers"
        :items="accounts"
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
                <td >{{ props.item.account }}</td>
                <td>{{ level[props.item.level] }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.cellphone }}</td>
                <td>{{ props.item.address}}</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data(){
        return{
            search:'',
            selected:[],
            pagination:{
                sortBy: 'id',
                rowsPerPage: 10
            },
            headers:[
                {text:'編號',align: 'left',sortable: true,value: 'id'},
                {text:'名稱',align: 'left',sortable: false,value: 'name'},
                {text:'帳號',align: 'left',sortable: false,value: 'account',},
                {text:'權限等級',align: 'left',sortable: true,value: 'level'},
                {text:'email',align:'left',sortable: false,value: 'email'},
                {text:'手機',align:'left',sortable: false,value:'cellphone'},
                {text:'地址',align:'left',sortable:false,value:'address'},
            ],
            accounts:[],
            account:{
                id:'',
                name:'',
                email:'',
                account:'',
                password:'',
                cellphone:'',
                address:'',
                level:'',
            },
            level:['一般會員','高級會員','員工'],
            dialog:[false],
            errorMessages:['',''],
        }
    },
    watch: {
        'account.account' (newAccount,oldAccount){
            api.checkAccount(newAccount).then(()=>{
                this.errorMessages[0] = '此帳號已被使用'
            }).catch(error=>{
                this.errorMessages[0] = ''
            })
        },
        'account.email' (newEmail,oldMail){
            api.checkEmail(newEmail).then(()=>{
                this.errorMessages[1] = '此信箱已被使用'
            }).catch(error=>{
                this.errorMessages[1] = ''
            })
        }
    },
    methods:{
        createAccount(){
            let list = ['name','email','account','password','cellphone','address','level']
            for(var i of list){
                if(i == 'level'){
                    this.account[i] = '一般會員'
                }
                else{
                    this.account[i] = ''
                }
            }
        },
        createConfirm(){
            let list = ['name','email','account','password','cellphone','address']
            var obj = {}
            for(var i of list){
                if(this.account[i]!=''){
                    obj[i] = this.account[i]
                }
            }
            obj.level = this.level.indexOf(this.account.level)
            if(obj.account == undefined || obj.password==undefined || obj.name==undefined || obj.email==undefined){
                alert('必填選項未填寫')
                return
            }
            let token = localStorage.getItem('token')
            api.createAccount(token,obj).then(res=>{
                alert('新增成功')
                window.location.reload()
            }).catch(error=>{
                alert('新增失敗')
            })
        },
        update(){
            let list = ['id','name','email','account','cellphone','address']
            for(var i of list){
                this.account[i] = this.selected[0][i]
            }
            this.account.level = this.level[this.selected[0].level]
            this.account.password = ''
        },
        updateConfirm(){
            let token = localStorage.getItem('token')
            let obj = {}
            let list = ['name','email','address','cellphone']
            let id = this.account.id
            let tmp ={}
            for(var i in this.accounts){
                if(this.accounts[i].id == id){
                    tmp = this.accounts[i]
                }
            }
            for(var i of list){
                if(this.account[i] != tmp[i]){
                    obj[i] = this.account[i]
                }
                console.log(this.account[i])
                console.log(tmp[i])
            }
            if(tmp.level != this.level.indexOf(this.account.level)){
                obj.level = this.level.indexOf(this.account.level)
            }
            if(this.account.name == '' || this.account.email==''){
                alert('有必填選項未填')
            }
            if(this.account.password !=''){
                obj.password = this.account.password
            }
            if(obj.name == undefined && obj.email == undefined && obj.password == undefined && obj.address == undefined && obj.cellphone == undefined && obj.level == undefined){
                alert('無資料修改')
                return
            }
            if(obj.email !== undefined){
                api.checkEmail(obj.email).then(res=>{
                    alert('信箱已被使用')
                    return
                }).catch(error=>{
                    api.update(token,id,obj).then(res=>{
                        alert('修改成功')
                        window.location.reload()
                    }).catch(error=>{
                        alert('修改失敗')
                        window.location.reload()
                    })
                })
            }
            else{
                api.update(token,id,obj).then(res=>{
                    alert('修改成功')
                    window.location.reload()
                }).catch(error=>{
                    alert('修改失敗')
                    window.location.reload()
                })
            }
        },
        deleteAccount(){
            let ids = []
            for(var i in this.selected){
                ids.push(this.selected[i].id)
            }
            api.deleteAccount(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload()
            }).catch(error=>{
                alert('刪除失敗')
                window.location.reload()
            })
        }
    },
    beforeMount(){
        let token = localStorage.getItem('token')
        let self = this
        api.getAllAccount(token).then(res=>{
            self.accounts = res.data.accounts
        }).catch(error=>{

        })
    }
}
</script>

<style>

</style>
