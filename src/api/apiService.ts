import axios from "./axiosInstance"

export const searchMedia = (params: string) => axios.get(`/search?q=${params}`)
