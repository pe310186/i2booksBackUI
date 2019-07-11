<template>
    <v-container>
        <v-spacer></v-spacer>
        <v-layout row>
            <v-text-field v-model="search" label="ISBN搜尋" class="input-group--focused"></v-text-field>
            <v-btn @click="isbnSearch()"><v-icon>search</v-icon></v-btn>
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout row><v-flex xs5 md5 lg5>
            <v-layout column>
                <v-text-field label="*書名" outline v-model="product.title" :error-messages="errorMessages[0]"></v-text-field>
                <v-text-field label="*ISBN" outline v-model="product.isbn"></v-text-field>
                <v-select v-model="product.type" label="*類別" attach :items="types" item-text="name" item-value="id"></v-select>
                <v-text-field label="作者" outline v-model="product.authors"></v-text-field>
                <v-layout row>
                    <v-text-field label="出版日期" outline v-model="product.publishedDate"></v-text-field>
                    <P>&nbsp;&nbsp;&nbsp;</P>
                    <v-text-field label="出版社" outline v-model="product.publisher"></v-text-field>
                </v-layout>
                <v-text-field label="*數量" outline v-model="product.number"></v-text-field>
                <v-layout row>
                    <v-text-field label="*原價" outline v-model="product.price"></v-text-field>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                    <v-text-field label="*售價" outline v-model="product.sell"></v-text-field>
                </v-layout>
                <p><font size="4">商品設定:</font></p>
                <v-layout row>
                    <v-checkbox label="顯示" v-model="product.visible"></v-checkbox>
                    <v-checkbox label="特價" v-model="product.on_sale"></v-checkbox>
                </v-layout>
            </v-layout>
            </v-flex>
            <v-flex offset-xs1>
                <font size="3"><p>圖片:</p></font>
                <v-carousel :cycle="false" height="550px">
                    <v-carousel-item v-for="(item,i) in product.pics" :key="i" next-icon="mdi-dark mdi-arrow-right">
                        <v-btn @click="fronter(i)" v-if="i!==0">上移</v-btn>
                        <v-btn @click="backer(i)" v-if="i!==(product.pics.length-1)">下移</v-btn>
                        <v-btn @click="deletePic(i)">刪除圖片</v-btn>
                        <v-img :src="item.url" contain max-height="460px"></v-img> 
                    </v-carousel-item>
                </v-carousel>
                <center>
                <upload-button title="新增圖片" name="pic" :selectedCallback="Upload"></upload-button>
                </center>
            </v-flex>
        </v-layout>
        <font size="3"><p>內容簡介:</p></font>
        <v-textarea auto-grow v-model="product.description" outline></v-textarea>
        <font size="3"><p>備註:</p></font>
        <v-textarea auto-grow v-model="product.ps" outline></v-textarea>
        <center>
            <v-btn @click="create()">新增</v-btn>
        </center>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data(){
        return{
            search:'',
            product:{
                title:'',
                isbn:'',
                type:'',
                authors:'',
                number:'',//數量
                publisher:'',//出版社
                price:'',//原價
                sell:'',//售價
                ps:'',//備註
                description:'',
                publishedDate:'',//出版日期
                pics:[],
                visible: true,
                on_sale: false,
            },
            types:[],
            errorMessages:[''],
        }
    },
    watch:{
        'product.title'(newTitle,oldTitle){
            console.log(newTitle)
            api.getProductByTitle(newTitle).then(res=>{
                console.log(product)
                this.errorMessages[0] = '此書已刊登過'
            }).catch(error=>{
                this.errorMessages[0] = ''
            })
        }
    },
    methods:{
        isbnSearch(){
            let self = this
            api.isbnSearch(this.search).then(res=>{
                self.product.title = res.data.book.title
                self.product.publishedDate = res.data.book.publishedDate
                self.product.publisher = res.data.book.publisher
                self.product.authors = ''
                for(var i in res.data.book.authors){
                    self.product.authors += res.data.book.authors[i]
                    if(i != res.data.book.authors.length-1){
                        self.product.authors += ','
                    }
                }
                self.product.isbn = self.search 
                console.log(self.product)
            }).catch(error=>{
                alert('查無此isbn')
            })
        },
        Upload(genre, file,src)
        {
            this.product.pics.push(file)
            this.product.pics[this.product.pics.length-1].url = URL.createObjectURL(file)
        },
        deletePic(index){
            this.product.pics.splice(index,1)
        },
        create(){
            const filledList = ['title','isbn','type','number','price','sell']

            for(var i of filledList){
                if(this.product[i] == ''){
                    alert('有必填選項未填')
                    return
                }
            }

            api.getProductByTitle(this.product.title).then(res=>{
                alert('此書已刊登過')
                this.errorMessages[0] = '此書已刊登過'
                return
            }).catch(error=>{
                this.errorMessages[0] = ''
            })

            let token = localStorage.getItem('token')
            let formdata = new FormData()
            const list=['title','isbn','type','authors','number','price','sell','ps','description','publishedDate','pics','visible','on_sale']
            for(var i of list){
                if(i == 'pics'){
                    for(var j in this.product.pics){
                        formdata.append("pics",this.product.pics[j])
                    }
                }
                else{
                    formdata.append(i,this.product[i])
                }
            }
            api.createProduct(token,formdata).then(res=>{
                alert('新增成功')
                window.location.reload()
            }).catch(error=>{
                alert('新增失敗')
            })
        },
        fronter(index){
            var tmp1 = this.product.pics[index-1]
            var tmp2 = this.product.pics[index]
            this.product.pics[index-1] = tmp2
            this.product.pics[index] = tmp1
            this.product.pics.push()
        },
        backer(index){
            var tmp1 = this.product.pics[index+1]
            var tmp2 = this.product.pics[index]
            this.product.pics[index+1] = tmp2
            this.product.pics[index] = tmp1
            this.product.pics.push()
        },
    },
    beforeMount(){
        let self = this
        api.getAllProductType().then(res=>{
            self.types = res.data.types
        }).catch(error=>{
        })
    }
}
</script>

<style>
.pic{
    background-size: contain
}
</style>
