import axios from "./axiosInstance"

export const searchMedia = async (params: string, page = 1) =>
  await axios.get(`/search?q=${params}&page=${page}&media_type=image`)

export const searchByNasaId = async (nasaId: string | undefined) =>
  await axios.get(`/search?&nasa_id=${nasaId}&media_type=image`)
