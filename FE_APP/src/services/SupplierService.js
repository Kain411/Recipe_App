import { HostURL } from "./Host";
const API_URL = `${HostURL}/suppliers`

export const getAllSuppliers = async() =>{
    try {
        const response = await fetch(`${API_URL}`,{method: 'GET'})
        if(!response.ok){
            return {
                status: response.status,
                message: "Lỗi kết nối",
                suppliers: null
            }
        }

        const result = response.json()
        return{
            message: "thành công",
            suppliers: result.suppliers
        }
    } catch (error) {
        return{
            suppliers: null,
            message: "Lỗi kết nối"
        }
    }
}

export const getSupplierById = async(id)=>{
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'GET' });
        if(!response.ok){
            return{
                status: response.status,
                message: "Lỗi kết nối",
                supplier: null
            }
        }


        const result = await response.json()

        return{
            message: "thành công",
            supplier: result.supplier
        }
    }
    catch(e){
        return {
            supplier: null,
            message: "Lỗi kết nối"
        };
    }
}