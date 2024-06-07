const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Blog = require('./../models/blogModel');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.resolve(__dirname, `./../public/uploads/${req.user._id}`);
        fs.mkdirSync(dir, { recursive: true }); // This will create the directory if it does not exist
        return cb(null, dir);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        return cb(null, filename);
    }
});

const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    });
})

router.post('/', upload.single('coverImage'), async(req, res) => {
    const { body,title } = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`
    })
    console.log(blog);
    return res.redirect(`/blog/${blog._id}`);
})


module.exports = router;