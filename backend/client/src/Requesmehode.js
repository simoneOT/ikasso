import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjJhMGFkNTdiOTNkMzZmZWE4NWQyMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Nzk4Mzc1OCwiZXhwIjoxNjY4MjQyOTU4fQ.hoVeXa2BhZrI4BG9DqXzwEShQfwMHbAu9rB5GDljQgg"

export const publicUrl = axios.create({
   baseURL: BASE_URL
})

export const userRequest = axios.create({
   baseURL: BASE_URL,
   header: {token:`Admin${TOKEN}` }
})