

//function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategroy, sizes, bestSeller } = req.body;

        // Access files from req.files (image1, image2, image3,image4.)
        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image1 && req.files.image2[0];
        const image3=req.files.image1 && req.files.image3[0];
        const image4=req.files.image1 && req.files.image4[0];
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
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
};

// function for list product

const listProducts = async (req, res) => {


}
// function for removing product
const removeProduct = async (req, res) => {

}
// function for single product info
const singleProduct = async (req, res) => {

}

export { addProduct, listProducts, removeProduct, singleProduct };
