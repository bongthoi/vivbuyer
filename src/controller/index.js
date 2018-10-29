import express from 'express';

/** */
import ProductService from '../service/productService';
import CategoryService from '../service/categoryService';
import Cart from '../service/cart';

/** */
let router = express.Router();
let productService = new ProductService();
let categoryService = new CategoryService();

/**products */
router.get('/', async (req, res) => {
    try {
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        req.session.cart=cart;

        let products = await productService.getAll();
        let categories = await categoryService.getAll();

        res.render('public/index', { title: "Home", categories: categories, products: products });
    } catch (error) {
        res.render('public/errors', { title: 'Errors', errors: error, categories: categories });
    }

});

router.get('/products/product_detail/:productID', async (req, res) => {
    try {
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        req.session.cart=cart;

        let product = await productService.getDetail(req.params.productID);
        let categories = await categoryService.getAll();

        res.render('public/product_detail', { title: 'Product Detail', categories: categories, product: product });
    } catch (error) {
        res.render('public/errors', { title: 'Errors', errors: error, categories: categories });
    }
});

/**categories */
router.get('/products/product_by_category/:categoryID', async (req, res) => {
    let categories;
    try {
        categories = await categoryService.getAll();
        let products = await productService.getByCategory(req.params.categoryID);

        res.render('public/product_by_category', { title: "Product By Category", categories: categories, products: products });
    } catch (error) {
        res.render('public/errors', { title: 'Errors', errors: error, categories: categories });
    }

});

/**user */
router.get('/users/register', async(req, res) => {
    let categories;
    try {
        categories = await categoryService.getAll();
        res.render('public/register', { title: 'Register', categories: categories });
    } catch (error) {
        res.render('public/errors', { title: 'Errors', errors: error, categories: categories });
    }
});

router.get('/users/login',async (req, res) => {
    let categories;
    try {
        categories = await categoryService.getAll();
        res.render('public/login', { title: 'Login', categories: categories });
    } catch (error) {
        res.render('public/errors', { title: 'Errors', errors: error, categories: categories });
    }
    
});

/**cart */
router.get("/index/cart/add/:id",async(req, res, next)=>{
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	try {
        let product = await productService.getDetail(productId);
        cart.add(product, productId);
        req.session.cart = cart;
        res.redirect("/");
    } catch (error) {
        res.redirect("/");
    }
	
});
router.get("/product_detail/cart/add/:id",async(req, res, next)=>{
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	try {
        let product = await productService.getDetail(productId);
        cart.add(product, productId);
        req.session.cart = cart;
        
        res.redirect("/products/product_detail/"+productId);
    } catch (error) {
        res.redirect("/");
    }
	
});

router.get("/cart/viewcart", async (req, res)=> {
    let categories;
	if (!req.session.cart) {
        categories = await categoryService.getAll();
		return res.render("public/viewcart", {title: "View Cart",products: null,categories: categories});
    }
    categories = await categoryService.getAll();
	var cart = new Cart(req.session.cart);

	res.render("public/viewcart", {title: "View Cart",products: cart.getItems(),totalPrice: cart.totalPrice,categories: categories});
});

router.get("/cart/remove/:id", async (req, res, next)=> {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.remove(productId);
	req.session.cart = cart;
	res.redirect("/cart/viewcart");
});

router.get("/cart/deleteall", async (req, res, next) =>{
	var cart = new Cart(false ? req.session.cart : {});
	req.session.cart = cart;
	res.redirect("/cart/viewcart");
});

/** */
module.exports = router;
