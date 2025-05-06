const Supplier = require("../model/Supplier")
const { db } = require("../firebase")

class SupplierController {
    // Thêm nhà cung cấp
    async addSupplier(data) {
        try {
            console.log("jj")
            const newDoc = db.collection("suppliers").doc();
            const newSupplier = new Supplier(
                newDoc.id,
                data.name,
                data.phone,
                data.email,
                data.location,
                data.url,
                data.background_url,
                data.description
            );

            await newDoc.set({ ...newSupplier });

            return { success: true, message: "Thêm nhà cung cấp thành công!", newSupplier: newSupplier };
        } catch (error) {
            console.error("Lỗi khi thêm nhà cung cấp:", error);
            return { success: false, message: "Lỗi khi thêm nhà cung cấp!", newSupplier: null };
        }
    }

    // Lấy danh sách nhà cung cấp
    async getAllSuppliers() {
        try {
            const querySnapshot = await db.collection("suppliers").get();

            if (querySnapshot.empty) {
                return { success: false, message: "Không tìm thấy nhà cung cấp nào!" };
            }

            const suppliers = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return { success: true, suppliers };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
            return { success: false, message: "Lỗi khi lấy danh sách nhà cung cấp!" };
        }
    }

    // Lấy nhà cung cấp theo ID
    async getSupplierById(id) {
        try {
            const doc = await db.collection("suppliers").doc(id).get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nhà cung cấp!" };
            }

            return { success: true, supplier: { id: doc.id, ...doc.data() } };
        } catch (error) {
            console.error("Lỗi khi lấy nhà cung cấp:", error);
            return { success: false, message: "Lỗi khi lấy nhà cung cấp!" };
        }
    }

    // Cập nhật nhà cung cấp
    async updateSupplier(id, data) {
        try {
            const docRef = db.collection("suppliers").doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nhà cung cấp!" };
            }

            await docRef.update(data);

            return { 
                success: true, 
                message: "Cập nhật nhà cung cấp thành công!", 
                supplier: {
                    id: doc.id,
                    ...data
                }};
        } catch (error) {
            console.error("Lỗi khi cập nhật nhà cung cấp:", error);
            return { success: false, message: "Lỗi khi cập nhật nhà cung cấp!" };
        }
    }

    // Xóa nhà cung cấp
    async deleteSupplier(id) {
        try {
            const docRef = db.collection("suppliers").doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { success: false, message: "Không tìm thấy nhà cung cấp!" };
            }

            await docRef.delete();

            return { success: true, message: "Xóa nhà cung cấp thành công!" };
        } catch (error) {
            console.error("Lỗi khi xóa nhà cung cấp:", error);
            return { success: false, message: "Lỗi khi xóa nhà cung cấp!" };
        }
    }
}

module.exports = SupplierController;