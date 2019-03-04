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
    }
}