const multer = require('multer')
const upload = multer({dest: 'upload/'})

module.exports = {
    uploadImage: () => {
        upload.single('image')
    }
}