import ProductRepo from '../repository/productRepo';
import db_config from '../../config/db_config.json';

/** */
var productRepo = new ProductRepo();

class ProductService {
    constructor() { };

    async getAll() {
        const method = "ProductService/getAll()";
        console.log(method + " -->start");

        try {           
            let products =await  productRepo.getAll();          
           for(let i=0;i<products.length;i++){
            products[i].image=db_config.api_image+products[i].image;
           }
            console.log(method + " -->success");
            return products;
        } catch (error) {
            console.log(method + " -->fail"+JSON.stringify(error));
            return new Error(error);
        }
    };
    
    async getDetail(productID){
        const method="productService/getDetail()";
        console.log(method+"  -->start");

        try {
            let product=await productRepo.getDetail(productID);
            console.log(method+"  -->success");
            product.image=db_config.api_image+product.image;
            return product;
        } catch (error) {
            console.log(method+"  -->error");
            return new Error(error);
        }
    };

    async getByCategory(categoryID){
        const method="productService/getByCategory()";
        console.log(method+"  -->start");

        try {           
            let products =await  productRepo.getByCategory(categoryID);          
           for(let i=0;i<products.length;i++){
            products[i].image=db_config.api_image+products[i].image;
           }
            console.log(method + " -->success");
            return products;
        } catch (error) {
            console.log(method + " -->fail"+JSON.stringify(error));
            return new Error(error);
        }
    };
}

module.exports = ProductService;