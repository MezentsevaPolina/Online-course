
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
    const {data} = await $host.post('api/user/registration', {name, email, password, role: 'MASTER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const fetchOneUser = async (id) => {
    const {data} = await $authHost.get('api/user/' + id,)
    return data
}
export const updateUser= async (id, user) => {
    const {data} = await $authHost.put('api/user/' + id, user)
    return data
}
export const deleteUser = async (id) => {
    const {data} = await $authHost.post('api/user/' + id)
    return data
}