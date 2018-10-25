import express  from    'express';

/** */
import ProductService from '../service/productService';


/** */
let router=express.Router();
let productService=new ProductService();

router.get('/',async (req,res)=>{
    try {
        let products=await productService.getAll();
        res.render('public/index',{products:products});
    } catch (error) {
        res.render('public/index',{products:products});
    }
        
});

router.get('/products/product_detail/:productID',(req,res)=>{
    res.render('public/product_detail');
});

/** */
module.exports=router;
