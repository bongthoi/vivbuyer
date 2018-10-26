import rq from 'request-promise';

/** */
import db_config from '../../config/db_config.json';
import CategoryModel from '../model/categoryModel';

class CategoryRepo{

    constructor(){};
    getAll(){
        const method='categoryRepo/getAll()';
        console.log(method+' -->start');

        let category=new CategoryModel();
        category.$class="vn.vivmall.categories";
        const options={
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:db_config.api_ip+':'+db_config.api_port+db_config.api_url+category.$class,
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };

    
};

module.exports=CategoryRepo;