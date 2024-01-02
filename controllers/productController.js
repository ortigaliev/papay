const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("POST: cont/getAllProduct");
    const product = new Product();
    const result = await product.getAllProductsData(req.member, req.body);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getAllProducts, ${err.message}`)
    res.json({state: 'fail', message: err.message})

  }
}

productController.getChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/ChosenProduct");
    const product = new Product(),
      id = req.params.id,
      result = await product.getChosenProductData(req.member, id);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getChosenProduct, ${err.message}`)
    res.json({state: 'fail', message: err.message})

  }
}


/*************************************
 *     BSSR RELATED METHODS          *
 ************************************/

productController.addNewProduct = async (req, res) =>{
  try{
    console.log("POST: cont/addNewProduct");
    assert(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;

    data.product_images = req.files.map((ele) => {
      return ele.path.replace(/\\/g, '/');
    });

    const result = await product.addNewProductData(data, req.member);
    assert.ok(result, Definer.product_err1);
    const html = `<script>
                    alert('new product added successfully');
                    window.location.replace("/resto/products/menu");
                  <script>`;
    res.end(html);
  } catch (err) {
    console.log(`ERROR, cont/addNewProduct, ${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) =>{
  try{
    console.log("POST: cont/updateChosenProduct");
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(
        id,
        req.body,
        req.member._id);
    res.json ({state: "success", data: result});

  } catch (err) {
    console.log(`ERROR, const/updateChosenProduct, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};