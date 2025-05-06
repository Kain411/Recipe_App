import { Children, createContext } from "react";
import { getAllSuppliers, getSupplierById} from "../services/SupplierService";
import { useState } from "react";

export const SupplierContext = createContext()

export const SupplierProvider = ({children})=>{

    const handleGetAllSuppliers = async()=>{
        const result = await getAllSuppliers()
        return {suppliers: result.suppliers}
    }

    const handleGetSupplierById = async(id)=>{
        const result = await getSupplierById(id);

        return {
            supplier: result.supplier,
            message: result.message
        }
    }

    return (
        <SupplierContext.Provider value={{ handleGetAllSuppliers, handleGetSupplierById }}>
            {children}
        </SupplierContext.Provider>
    )
}