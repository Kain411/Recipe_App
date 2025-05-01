const express = require('express');
const router = express.Router();
const { uploadCloud } = require('./cloudinary');

router.post('/:userId/:type', uploadCloud.single('image'), async (req, res) => {
    const type = req.params.type;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    try {
        const imageUrl = file.path;

        return res.status(200).json({
            success: true,
            message: `Cập nhật ảnh ${type} thành công`,
            url: imageUrl
        });

    } catch (error) {
        console.error("Lỗi khi upload:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

module.exports = router;