import axios from 'axios'

let client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000
})

export default {
    login(account, password) {
        return client.post('/account/employee/login', {account: account, 
                                                       password: password})
    },
    backendCheck(token){
        return client.get('/account/backendCheck', {headers:{"Auth":token}})
    },
    getAllAccount(token){
        return client.get('/account/all',{headers:{"Auth":token}})
    },
    checkAccount (account) {
        return client.post('/account/checkAccount', {account:account})
    },
    checkEmail (email){
        return client.post('/account/checkEmail', {email:email})
    },
    createAccount(token,data){
        return client.post('/account/employee/create',data,{headers:{"Auth":token}})
    },
    update(token,id,data){
        return client.put('/account/'+id,data,{headers:{"Auth":token}})
    },
    deleteAccount(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('./account',config)
    },
    isbnSearch(isbn){
        return client.get('./product/isbn/'+ isbn)
    },
    createProduct(token,formdata){
        let config = {
            headers: {
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.post('./product/create',formdata,config)
    },
    getProductByTitle(title){
        return client.get('./product/title/'+ title)
    },
    getCarousel(){
        return client.get('./carousel')
    },
    createCarousel(token,formdata){
        let config = {
            headers:{
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.post('./carousel',formdata,config)
    },
    deleteCarousel(token,id){
        console.log(token)
        return client.delete('/carousel/'+id,{headers:{"Auth":token}})
    },
    changeQueue(token,pic1,pic2){
        let pics = [pic1,pic2]
        return client.put('/carousel',pics,{headers:{"Auth":token}})
    },
    getProduct(token){
        return client.get('/product/all',{headers:{"Auth":token}})
    },
    deleteProduct:function(token,ids){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'ids':ids
            }
        }
        return client.delete('./product',config)
    },
    updateProduct:function(token,data,id){
        return client.put('./product/'+id,data,{headers:{"Auth":token}})
    },
    changeProductQueue(token,id,pic1,pic2){
        let pics = [pic1,pic2]
        return client.put('/product/queue/'+id,pics,{headers:{"Auth":token}})
    },
    createProductPic(token,id,formdata){
        let config = {
            headers:{
                'Auth': token,
                'content-type': 'multipart/form-data'
            }
        }
        return client.post('./product/pic/'+id,formdata,config)
    },
    deleteProductPic(token,id,index){
        return client.delete('/product/pic/'+id +'/'+ index,{headers:{"Auth":token}})
    },
    getProductType(superID){
        return client.get('/product/type/'+superID)
    },
    getAllProductType(){
        return client.get('/product/type')
    },
    createProductType(token,data){
        return client.post('/product/type',data,{headers:{"Auth":token}})
    },
    updateProductType(token,id,data){
        return client.put('/product/type/' + id,data,{headers:{'Auth':token}})
    },
    deleteType(token,id){
        let config = {
            headers:{
                'Auth': token,
            },
            data:{
                'id':id
            }
        }
        return client.delete('./product/type',config)
    },
    updateArticle(token,id,content){
        return client.put('./article/' + id , {content:content},{headers:{'Auth':token}})
    },
    getArticle(id){
        return client.get('./article/'+id)
    },
}