const express = require("express");
const { validationResult } = require("express-validator");
const {validateSupplier} = require("../validator/SupplierValidator")
const SupplierController = require("../controller/SupplierController");
const Supplier = require("../model/Supplier");

const router = express.Router();
const supplierController = new SupplierController()


router.post("/", validateSupplier, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    try{
        const result = await supplierController.addSupplier(req.body);
        return res.status(200).json({
            message: result.message,
            newSupplier: result.newSupplier
        })
    }
    catch(error){
        return res.status(500).json({ success: false, message: "Lỗi server!",  newSupplier: null });        
    }
});

router.get("/", async(req, res) =>{
    try{
        const result = await supplierController.getAllSuppliers()
        return res.status(result.success ? 200 : 404).json(result)
    }
    catch(error){
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
})

router.get("/:id", async(req, res) => {
    try{
        const {id} = req.params
        const result = await supplierController.getSupplierById(id)
        return res.status(result.success ? 200 : 404).json(result)
    }
    catch(error){
        return res.status(500).json({success: false, message:"Lỗi server!" });        
    }
})


router.put("/:id", validateSupplier, async(req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({success: false, errors: errors.array()});
    }

    try{
        const {id} = req.params;
        const result = await supplierController.updateSupplier(id, req.body);
        return res.status(result.success ? 200 : 400).json({
            message: result.message,
            supplier: result.supplier
        });
    }
    catch(error){
        return res.status(500).json
    }
})

router.delete("/:id", async(req, res) =>{
    try{
        const{id} = req.params
        const result = await supplierController.deleteSupplier(id)
        return res.status(result.success ? 200 : 404).json(result);
    }
    catch(error){
        return res.status(500).json({succes: false, message:"Lỗi Server!"})
    }
})
module.exports = router;