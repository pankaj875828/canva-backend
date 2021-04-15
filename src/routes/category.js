const express = require('express');
const { addCategory, getCategories,getCategoryImage} = require('../controller/category');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })
   
  const upload = multer({ storage })

router.post('/category/create',upload.single("categoryImage"),addCategory)
router.get('/category/getcategory',getCategories)
router.get('/category/categoryimage',getCategoryImage)






module.exports = router