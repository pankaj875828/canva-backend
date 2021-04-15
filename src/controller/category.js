const Category = require('../models/category')
const slugify = require('slugify')

function createCategories(categories,parentId = null){
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat=>cat.parentId == undefined);
    }else{
        category = categories.filter(cat =>cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            categoryImage:cate.categoryImage,
            children:createCategories(categories,cate._id)
        })
    }
    return categoryList;
}

function getCategories(categories,parentId = null){
    const categoryImages = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat=>cat.parentId == undefined);
    }else{
        category = categories.filter(cat =>cat.parentId == parentId)
    }

    for(let cate of category){
        categoryImages.push({
            _id:cate._id,
            categoryImage:cate.categoryImage,
        })
    }
    return categoryImages;
}

exports.addCategory = (req,res)=>{

    const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    const cat = new Category(categoryObj)
    cat.save((error,category)=>{
        if(error){
            return res.status(422).json({error})
        }
        if(category){
            return res.status(200).json({category})
        }
    })
}


exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error,categories)=>{
        if(error){
            return res.status(422).json({error})
        }
        if(categories){
            const categoryList = createCategories(categories)
            return res.status(200).json({categoryList})
        } 
    })
}

exports.getCategoryImage = (req, res) => {
    Category.find({})
    .exec((error,categories)=>{
        if(error){
            return res.status(422).json({error})
        }
        if(categories){
            const categoryImages = getCategories(categories)
            return res.status(200).json({categoryImages})
        } 
    })
}





