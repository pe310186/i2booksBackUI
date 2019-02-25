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
    }
}