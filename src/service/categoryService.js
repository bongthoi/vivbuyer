import CategoryRepo from '../repository/categoryRepo';

/** */
let categoryRepo=new CategoryRepo();

class CategoryService{
    constructor(){};

    async getAll(){
        const method='categoryService/getAll()';
        console.log(method+' -->start');

        try {
            let categories=await categoryRepo.getAll();
            console.log(method+' -->success');
            return categories;
        } catch (error) {
            console.log(method+' -->fail');
            return new Error(error);
        }
    };    
};

module.exports=CategoryService;