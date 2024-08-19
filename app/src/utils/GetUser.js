import Cookies from 'universal-cookie'
import request from '../api/request'

const cookies = new Cookies()

export default async function getUser() {
    return (await request('/person/me', 'get', {'token': cookies.get("token")})).data
}