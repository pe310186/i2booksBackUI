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
    checkAccount(token){
        return client.get('/account/backendCheck', {headers:{"Auth":token}})
    }
}