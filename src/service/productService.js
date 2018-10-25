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
    
}

module.exports = ProductService;