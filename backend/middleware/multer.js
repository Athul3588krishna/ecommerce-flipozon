// import multer from "multer";

// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)    
        
//     }
// })

// const upload = multer({storage})

// export default upload;

import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        // Set the file name as the original name or you can customize it
        callback(null, Date.now() + '-' + file.originalname); // Adding timestamp to avoid name conflicts
    }
});

// Setting up multer with the storage engine
const upload = multer({ storage });

// If you want to allow multiple file uploads for specific fields, you can use `upload.fields()`
export const uploadFields = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]);

export default upload;
