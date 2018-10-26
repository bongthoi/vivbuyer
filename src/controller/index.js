import express  from    'express';

/** */
import ProductService from '../service/productService';
import CategoryService from '../service/categoryService';


/** */
let router=express.Router();
let productService=new ProductService();
let categoryService =new CategoryService();

router.get('/',async (req,res)=>{
    try {
        let products=await productService.getAll();
        let categories=await categoryService.getAll();       

        res.render('public/index',{title:"Home",categories:categories,products:products});
    } catch (error) {
        res.render('public/errors',{title:'Errors',errors:error,categories:categories});
    }
        
});

router.get('/products/product_detail/:productID',async(req,res)=>{
    try {
        let product=await productService.getDetail(req.params.productID);
        let categories=await categoryService.getAll();

        res.render('public/product_detail',{title:'Product Detail',categories:categories,product:product});
    } catch (error) {
        res.render('public/errors',{title:'Errors',errors:error,categories:categories});
    } 
});

router.get('/products/product_by_category/:categoryID',async (req,res)=>{
    let categories;
    try {        
        categories=await categoryService.getAll();
        let products=await productService.getByCategory(req.params.categoryID);

        res.render('public/product_by_category',{title:"Product By Category",categories:categories,products:products});
    } catch (error) {
        res.render('public/errors',{title:'Errors',errors:error,categories:categories});
    }
        
});



/** */
module.exports=router;
