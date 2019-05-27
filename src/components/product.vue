<template>
    <v-container>
        <v-layout row>
            <v-dialog v-if="selected.length==1" v-model="dialog[1]" width="1200">
                <v-btn slot="activator" @click="update(selected[0].id)">修改</v-btn>
                <v-card>
                    <br>
                    <br>
                    <v-flex offset-xs1 xs10 md10 lg10>
                    <v-layout row><v-flex xs4 md4 lg4>
                        <v-layout column>
                            <v-text-field label="書名" outline v-model="product.title" :error-messages="errorMessages[0]"></v-text-field>
                            <v-text-field label="ISBN" outline v-model="product.isbn"></v-text-field>
                            <v-select v-model="product.type" label="類別" attach :items="types" ></v-select>
                            <v-text-field label="作者" outline v-model="product.authors"></v-text-field>
                            <v-text-field label="出版日期" outline v-model="product.publishedDate"></v-text-field>
                            <v-text-field label="數量" outline v-model="product.number"></v-text-field>
                            <p>商品設定:</p>
                            <v-layout row>
                                <v-checkbox label="顯示" v-model="product.visible"></v-checkbox>
                                <v-checkbox label="特價" v-model="product.on_sale"></v-checkbox>
                            </v-layout>
                            <v-layout row>
                                <v-text-field label="原價" outline v-model="product.price"></v-text-field>
                                <v-spacer></v-spacer>
                                <v-text-field label="售價" outline v-model="product.sell"></v-text-field>
                            </v-layout>
                        </v-layout>
                        </v-flex>
                        <v-flex offset-xs1>
                            <font size="3"><p>圖片:</p></font>
                            <v-carousel :cycle="false" height="500px">
                                <v-carousel-item v-for="(item,i) in product.pic" :key="i" next-icon="mdi-dark mdi-arrow-right" >
                                    <v-btn @click="fronter(i)" v-if="i!==0">上移</v-btn>
                                    <v-btn @click="backer(i)" v-if="i!==(product.pic.length-1)">下移</v-btn>
                                    <v-btn @click="deletePic(i)">刪除圖片</v-btn>
                                    <v-img :src="item.url" contain height="380px"></v-img>
                                </v-carousel-item>
                            </v-carousel>
                            <center>
                            <upload-button title="新增圖片" name="pic" :selectedCallback="Upload"></upload-button>
                            </center>
                        </v-flex>
                    </v-layout>
                    </v-flex>
                    <v-flex offset-xs1 xs10 md10 lg10>
                    <font size="3"><p>內容簡介:</p></font>
                    <v-textarea auto-grow v-model="product.description" outline></v-textarea>
                    <font size="3"><p>備註:</p></font>
                    <v-textarea auto-grow v-model="product.ps" outline></v-textarea>
                    </v-flex>
                    <center>
                        <v-btn @click="updateConfirm()">保存修改</v-btn>
                    </center>
                    <br>
                </v-card>
            </v-dialog>
            <v-dialog v-if="selected.length!=0" v-model="dialog[2]" width="200">
                <v-btn slot="activator">刪除</v-btn>
                <v-card>
                    <br>
                    <center>
                        <p>確認刪除以選項目?</p>
                        <v-btn @click="deleteConfirm()">確認</v-btn>
                        </center>
                    <br>
                </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
                <v-text-field v-model="search" label="搜尋" class="input-group--focused"></v-text-field>
            <v-spacer></v-spacer>
        </v-layout>
        <br>
        <v-data-table
        :headers="headers"
        :items="products"
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
                <td>{{ props.item.title }}</td>  
                <td >{{ props.item.type }}</td>
                <td>{{ visible_map[props.item.visible] }}</td>
                <td>{{ on_sale_map[props.item.on_sale] }}</td>
                <td>{{ props.item.number }}</td>
                <td>
                    <v-dialog v-model="dialog[0]" width="1000px">
                        <v-btn @click="detail(props.item.id)" slot="activator">詳細</v-btn>
                        <v-card>
                            <br>
                            <v-layout>
                                <v-flex xs4>
                                <v-layout column>
                                    <v-flex offset-xs2>
                                        <font size="4">
                                        <p>書名:&nbsp;&nbsp;{{product.title}}</p>
                                        <p>ISBN:&nbsp;&nbsp;{{product.isbn}}</p>
                                        <p>類別:&nbsp;&nbsp;{{product.type}}</p>
                                        <p>作者:&nbsp;&nbsp;{{product.author}}</p>
                                        <p>出版社:&nbsp;&nbsp;{{product.publisher}}</p>
                                        <p>出版日期:&nbsp;&nbsp;{{product.publishedDate}}</p>
                                        <p>剩餘數量:&nbsp;&nbsp;{{product.number}}</p>
                                        <p>原價:&nbsp;&nbsp;{{product.price}}</p>
                                        <p>售價:&nbsp;&nbsp;{{product.sell}}</p>
                                        <p>內容簡介:&nbsp;&nbsp;{{product.description}}</p>
                                        <p>備註:&nbsp;&nbsp;{{product.ps}}</p>
                                        </font>
                                    </v-flex>
                                </v-layout>
                                </v-flex>
                                <v-flex xs6>
                                    <v-carousel :cycle="false" height="400px">
                                        <v-carousel-item v-for="(item,i) in product.pic" :key="i" next-icon="mdi-dark mdi-arrow-right" >
                                            <v-img :src="item.url" contain height="380px"></v-img>
                                        </v-carousel-item>
                                    </v-carousel>
                                </v-flex>
                            </v-layout>
                            <br>
                        </v-card>
                    </v-dialog>
                </td>
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
                {text:'書名',align: 'left',sortable: false,value: 'title'},
                {text:'類別',align: 'left',sortable: true,value: 'type'},
                //{text:'ISBN',align: 'left',sortable: false,value: 'isbn',},
                {text:'顯示',align: 'left',sortable: true,value: 'visible'},
                {text:'特價',align: 'left',sortable: true,value: 'on_sale'},
                {text:'數量',align: 'left',sortable: true,value: 'number'},
                {text:'詳細',align:'left',sortable:false,value:'detail'},
            ],
            products:[],
            product:{
                title:'',
                isbn:'',
                type:'',
                authors:'',
                number:'',//數量
                price:'',//原價
                sell:'',//售價
                ps:'',//備註
                description:'',
                publishedDate:'',//出版日期
                publisher:'',//出版社
                pic:[],
                visible:false,
                on_sale:false
            },
            types:[],
            dialog:[false,false,false],
            errorMessages:[''],
            visible_map:['隱藏','顯示'],
            on_sale_map:['無','特價']
        }
    },
    methods:{
        detail(id){
            this.product = {
            }
            for(var i in this.products){
                if(this.products[i].id == id){
                    this.product = this.products[i]
                    console.log(this.product)
                    return
                }
            }
        },
        update(id){
            for(var i in this.products){
                if(this.products[i].id == id){
                    this.product = this.products[i]
                    return
                }
            }
        },
        deleteConfirm(){
            var ids=[];
            for(var i in this.selected){
                ids[i]=this.selected[i].id;
            }
            let token = localStorage.getItem('token')
            api.deleteProduct(token,ids).then(res=>{
                alert('刪除成功')
                window.location.reload();
            }).catch(error=>{
                alert(error)
                window.location.reload();
            })
        },
        Upload(genre, file,src)
        {
            console.log(file)
            this.product.pic.push(file)
            this.product.pic[this.product.pic.length-1].url = URL.createObjectURL(file)
            let token = localStorage.getItem('token')
            let formdata = new FormData()
            let self = this
            formdata.append("pic",file)
            api.createProductPic(token,this.product.id,formdata).then(res=>{
                api.getProduct().then(res=>{
                    self.products = res.data.products
                    for(var i in res.data.products){
                        if(res.data.products[i].id == self.product.id){
                            self.product = res.data.products[i]
                        }
                    }
                })
            }).catch(error=>{
                alert('新增失敗')
            })
        },
        updateConfirm(){
            let token = localStorage.getItem('token')
            const list = ['title','isbn','type','authors','number','price','sell','ps','description','publishedDate','visible','on_sale']
            let obj = {
            }
            for(var i of list){
                obj[i] = this.product[i]
            }
            api.updateProduct(token,obj,this.product.id).then(res=>{
                alert('修改成功')
                window.location.reload()
            }).catch(error=>{
                alert('修改失敗')
            })
        },
        fronter(index){
            let token = localStorage.getItem('token')
            var tmp1 = this.product.pic[index-1]
            var tmp2 = this.product.pic[index]
            this.product.pic[index-1] = tmp2
            this.product.pic[index] = tmp1
            this.product.pic.push()
            api.changeProductQueue(token,this.product.id,this.product.pic[index],this.product.pic[index-1]).then(res=>{
            }).catch(error=>{
            })
        },
        backer(index){
            let token = localStorage.getItem('token')
            var tmp1 = this.product.pic[index+1]
            var tmp2 = this.product.pic[index]
            this.product.pic[index+1] = tmp2
            this.product.pic[index] = tmp1
            this.product.pic.push()
            api.changeProductQueue(token,this.product.id,this.product.pic[index],this.product.pic[index+1]).then(res=>{
            }).catch(error=>{
            })
        },
        deletePic(index){
           let token = localStorage.getItem('token')
            api.deleteProductPic(token,this.product.id,index).then(res=>{
                console.log("succeed")
                this.product.pic.splice(index,1)
            }).catch(error=>{
            })
        },
    },
    beforeMount(){
        let self = this
        api.getProduct().then(res=>{
            console.log(self.products)
            self.products =  res.data.products
        }).catch(error=>{
        })

        api.getProductType().then(res=>{
            for(var i in res.data.types){
                self.types.push(res.data.types[i].name)
            }
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
