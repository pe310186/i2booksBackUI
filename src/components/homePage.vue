<template>
    <v-container>
        <font size="3"><p>圖片:</p></font>
        <v-carousel :cycle="false" height="480px">
            <v-carousel-item v-for="(item,i) in pics" :key="i" next-icon="mdi-dark mdi-arrow-right">
                <v-btn @click="fronter(i)" v-if="i!==0">上移</v-btn>
                <v-btn @click="backer(i)" v-if="i!==(pics.length-1)">下移</v-btn>
                <v-btn @click="deletePic(i)">刪除圖片</v-btn>
                <v-img :src="item.url" contain></v-img> 
            </v-carousel-item>
        </v-carousel>
        <center>
            <upload-button title="新增圖片" name="pic" :selectedCallback="Upload"></upload-button>
        </center>
        <br>
    </v-container>
</template>

<script>
import api from '../store/api.js'
export default {
    data(){
        return{
            pics:[],
        }
    },
    methods:{
        Upload(genre, file,src)
        {
            this.pics.push(file)
            this.pics[this.pics.length-1].url = URL.createObjectURL(file)
            let token = localStorage.getItem('token')
            let formdata = new FormData()
            let self = this
            formdata.append("pic",file)
            formdata.append("queue",this.pics.length-1)
            api.createCarousel(token,formdata).then(res=>{
                api.getCarousel().then(res=>{
                    self.pics = res.data.pics
                }).catch(error=>{
                })
            }).catch(error=>{
                alert('新增失敗')
            })
        },
        deletePic(index){
            let token = localStorage.getItem('token')
            api.deleteCarousel(token,this.pics[index].id).then(res=>{
                this.pics.splice(index,1)
            }).catch(error=>{
            })
        },
        fronter(index){
            var tmp1 = this.pics[index-1]
            var tmp2 = this.pics[index]
            this.pics[index-1] = tmp2
            this.pics[index] = tmp1
            this.pics.push()
            let token = localStorage.getItem('token')
            api.changeQueue(token,this.pics[index],this.pics[index-1]).then(res=>{
            }).catch(error=>{
            })
        },
        backer(index){
            var tmp1 = this.pics[index+1]
            var tmp2 = this.pics[index]
            this.pics[index+1] = tmp2
            this.pics[index] = tmp1
            this.pics.push()
            let token = localStorage.getItem('token')
            api.changeQueue(token,this.pics[index],this.pics[index+1]).then(res=>{
            }).catch(error=>{
            })
        },
    },
    beforeMount(){
        let self = this
        api.getCarousel().then(res=>{
            console.log(res.data.pics)
            self.pics = res.data.pics
        }).catch(error=>{
        })
    }
}
</script>

<style>

</style>
