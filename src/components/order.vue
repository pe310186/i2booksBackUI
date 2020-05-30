<template>
    <v-container>
        <v-text-field v-model="order.search" label="搜尋" class="input-group--focused"></v-text-field>
        <v-layout row v-if="order.selected.length!=0"><v-btn @click="cancelOrder()">取消訂單</v-btn><v-btn @click="changeState()">變更貨品狀況</v-btn></v-layout>
        <br>
        <v-data-table 
            :headers="order.headers"
            :items="order.list"
            :search="order.search"
            v-model="order.selected"
            select-all
            item-key="id"
            :pagination.sync="order.pagination"
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
                <td>{{props.item.id}}</td>
                <td>{{props.item.name}}</td>
                <td>{{props.item.cellphone}}</td>
                <td>{{props.item.date}}</td>
                <td>{{order.shipState[props.item.ship_type].text}}</td>
                <td>{{props.item.money+order.shipState[props.item.ship_type].price}}</td>
                <td>{{stateItems[props.item.state].text}}</td>
                <td><v-btn small @click="orderDetail(props.item.id)">訂單內容</v-btn></td>
            </template>
        </v-data-table>
        <br>
        <v-divider></v-divider>
        <v-dialog v-model="order.cancelDialog" width="300">
            <v-card width="300" height="200">
                <center>
                    <br>
                    <br>
                    <font size="4">確定要取消訂單?</font>
                </center>
                <br>
                <br>
                <v-layout row justify-center>
                    <v-btn @click="cancelOrderCheck()">是</v-btn><v-btn @click="order.cancelDialog=false">否</v-btn>
                </v-layout>
                <br>
            </v-card>
        </v-dialog>
        <v-dialog v-model="order.detailDialog" width="1000">
            <v-card flat>
                <br>
                <center><font size="4"><p>訂單內容</p></font></center>
                <br>
                <v-flex offset-xs1>
                    <p>姓名:&nbsp;{{order.detail.name}}</p>
                    <p>手機:&nbsp;{{order.detail.cellphone}}</p>
                    <p>運送方式:&nbsp;{{order.shipState[order.detail.ship_type].text}}</p>
                    <p>地址:&nbsp;{{order.detail.address}}</p>
                    <p>金額:&nbsp;{{order.detail.money + order.shipState[order.detail.ship_type].price}}(已含運)</p>
                    <p>貨品狀況:&nbsp;{{stateItems[order.detail.state].text}}</p>
                </v-flex>
                <br>
                <v-flex xs10 offset-xs1>
                    <v-data-table 
                        :headers="order.detail.headers"
                        :items="order.detail.list"
                        item-key="id"
                        :pagination.sync="order.detail.pagination"
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
                        <td>{{props.item.title}}</td>
                        <td><v-img contain :src='props.item.pic[0].url' width="180"></v-img></td>
                        <td>{{props.item.sell}}</td>
                    </template>
                    </v-data-table>
                    <br>
                    <br>
                </v-flex>
            </v-card>
        </v-dialog>
        <v-dialog v-model="stateDialog" width="600">
            <v-card flat>
                <br>
                <br>
                    <v-flex xs9 offset-xs1>
                        <center><font size="4"><p>變更貨品狀況</p></font></center>
                        <v-select label="貨品狀況" outline :items="stateItems" v-model="state" attach item-value="type" item-text="text"></v-select>
                        <center><v-btn @click="changeStateCheck()">變更</v-btn></center>
                    </v-flex>
                <br>
                <br>
                <br>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data(){
        return {
            state:0,
            stateDialog:false,
            stateItems:[{text:'訂單處理中',type:0},{text:'已出貨',type:1},{text:'訂單完成',type:2}],
            order:{
                headers:[
                    {text:'訂單編號',align: 'left',sortable: false,value: 'id'},
                    {text:'姓名',align:'left',sortable:false,value:'name'},
                    {text:'手機',align:'left',sortable:false,value:'cellphone'},
                    {text:'下單日期',align: 'left',sortable: true,value: 'date'},
                    {text:'運送方式',align:'left',sortable:false,value:'ship_type'},
                    {text:'金額',align: 'left',sortable: false,value: 'price'},
                    {text:'貨品狀況',align: 'left',sortable: false,value: 'state'},
                    {text:'詳細',align: 'center',sortable: false,value: 'content'},
                ],
                shipState:[{type:0,text:'宅配+30',price:30}],
                pagination:{
                    sortBy: 'date',
                    rowsPerPage: 10
                },
                search:'',
                selected:[],
                list:[],
                detail:{
                    name:'',
                    cellphone:'',
                    address:'',
                    money:'',
                    ship_type:0,
                    state:0,
                    date:'',
                    account:'',
                    headers:[
                        {text:'書名',align:'left',sortable:false,value:'title'},
                        {text:'封面',align:'center',sortable:false,value:'picture'},
                        {text:'優惠價',align:'left',sortable:false,value:'price'},
                    ],
                    list:[],
                    pagination:{
                    sortBy: 'date',
                    rowsPerPage: 5
                    }
                },
                cancelDialog:false,
                detailDialog:false,
                detailID:-1
            }
        }
    },
    methods:{
        cancelOrder(){
            this.order.cancelDialog = true
            console.log(this.order.selected)
        },
        cancelOrderCheck(){
            let token = localStorage.getItem('token')
            let self = this
            let obj = {
                list:[],
            }
            for(var i in this.order.selected){
                obj.list.push(this.order.selected[i].id)
            }
            api.cancelOrder(token,obj).then(res=>{
                alert('取消成功')
            }).catch(error=>{
                alert('取消失敗')
            }).then(()=>{
                location.reload()
            })
        },
        orderDetail(id){
            this.order.detail.list = []
            for(var i in this.order.list){
                if(this.order.list[i].id == id){
                    this.order.detail.name = this.order.list[i].name
                    this.order.detail.cellphone = this.order.list[i].cellphone
                    this.order.detail.address = this.order.list[i].address
                    this.order.detail.money = this.order.list[i].money
                    this.order.detail.ship_type = this.order.list[i].ship_type
                    this.order.detail.state = this.order.list[i].state
                    var cartlists =  JSON.parse(this.order.list[i].cartlist)
                    for(var j in cartlists){
                        let self = this
                        console.log(cartlists[j])
                        api.getProduct(cartlists[j]).then(res=>{
                            if(res.data.product.pics!=0){
                                self.order.detail.list.push(res.data.product)
                            }
                            else{
                                let prod = res.data.product
                                let obj ={
                                        url:"http://localhost:3000/uploadedFile/null.png"
                                    }
                                prod.pic.push(obj)
                                self.order.detail.list.push(prod)
                            }
                        }).catch(error=>{
                        })
                    }
                    break
                }
            }
            this.order.detailID = id
            this.order.detailDialog = true
        },
        changeState(){
            for(var i in this.order.selected){
                console.log(parseInt(this.order.selected[i].id,16))
            }
            this.state = 0
            this.stateDialog = true
        },
        changeStateCheck(){
            let self = this
            let token = localStorage.getItem('token')
            let obj = {
                list:[],
                state:this.state,
            }
            for(var i in this.order.selected){
                obj.list.push(parseInt(this.order.selected[i].id,16))
            }

            api.changeOrderState(token,obj).then(()=>{
                alert('變更成功')
                window.location.reload()
            }).catch(error=>{
                alert('變更失敗')
                window.location.reload()
            })
        }
    },
    beforeMount(){
        let self = this
        let token = localStorage.getItem('token')
        api.getAllOrder(token).then(res=>{
            self.order.list = res.data.orders
            for(var i in self.order.list){
                self.order.list[i].id = self.order.list[i].id.toString(16)
            }
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
