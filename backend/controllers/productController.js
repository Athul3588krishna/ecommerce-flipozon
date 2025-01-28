import { error } from "console";


//function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategroy, sizes, bestSeller } = req.body;

        // Access files from req.files (image1, image2, image3,image4.)
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image1 && req.files.image2[0];
        const image3 = req.files.image1 && req.files.image3[0];
        const image4 = req.files.image1 && req.files.image4[0];
        // Check if all images are uploaded
        if (!image1 || !image2 || !image3 || !image4) {
            return res.status(400).json({ success: false, message: "All images are required" });
        }

        // Log product details and images for debugging
        console.log(name, description, price, category, subCategroy, sizes, bestSeller);
        console.log(image1, image2, image3, image4);

        // Respond with success
        res.json({ success: true, message: "Product added successfully!" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
};

// function for list product

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// funcion for removing product
const removeProduct = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
// function for single product info
try {
    const singleProduct = async (req, res) => {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    }
} catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

}


export { addProduct, listProducts, removeProduct, singleProduct };



///postman pending check