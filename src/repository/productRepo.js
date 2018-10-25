'use strict';
import rq from "request-promise";

/** */
import ProductModel from '../model/productModel';
import db_config from '../../config/db_config.json';

class ProductRepo{
    constructor() { };
    getAll() {
        let method = "productRepo/getAll()";
        let product = new ProductModel();
        console.log(method+" -->start");

        // let product = new ProductModel();
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            uri: db_config.api_ip + ":" + db_config.api_port + db_config.api_url + product.$class+"s",
            json: true
        };

        return new Promise((resolve,reject)=>{
             rq(options, function (error, result) {
                if(error){
                    console.log(method+" -->fail");
                    return reject(new Error(error));
                }else{
                    console.log(method+ "-->success");
                    return resolve(result.body);
                };
            });
        });

        
    };
   
};


/** */
module.exports=ProductRepo;