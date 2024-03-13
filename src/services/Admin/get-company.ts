import {api} from "boot/axios";

export const getCompany = async () => {
    const {data} = await api.get(`/api/v1/get-company`)
    return data.data
}
