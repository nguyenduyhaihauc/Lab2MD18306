var express = require('express');
var router = express.Router();

// Them model
const Distributor = require('../models/distributor')
const Fruits = require('../models/fruits')
// API them distributor
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; //Lay du lieu tu body
        const newDistributor = new Distributor({
            name: data.name
        }); // Tao mot doi tuong moi
        const result = await newDistributor.save(); //Them vao database
        if(result){
            // Neu them thanh cong result !null tra ve du lieu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else{
            // Nếu thêm không thành công result null thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

// API thêm fruit
router.post("/add-fruit", async (req,res) => {
    try {
        const data = req.body; //Lấy dữ liệu từ body
        const newfruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        }); //Tạo một đối tượng mới
        const result = await newfruit.save(); //Thêm vào database
        if(result){
            // Neu them thanh cong resylt !null tra ve du lieu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else{
            // Nếu thêm không thành công result null, thông báo không trả về dữ liệu
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})



// Get danh sach Fruits
router.get('/get-list-fruit', async(req, res) => {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách Fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})


// Get ds Fruit theo id
// router.get('/get-fruit-by-id/:id', async (req, res) => {
//     try {
//         const {id} = req.params; //Lay du lieu thong qua id
//         const data = await Fruits.findById(id).populate('id_distributor');
//         res.json([
//             "status": 200,
//             "messenger": "Danh sách Fruit",
//             "data": data
//         ])
//     } catch (error) {
//         console.log(error);
//     }
// })

// Get ds va sap xep quantity
router.get('/get-list-fruit-in-price', async (req, res) => {
    try {
        const {price_start, price_end} = req.query
        const query = {price: {$gte: price_start, $lte: price_end}}
        const data = await Fruits.find(query, "name quantity price id_ditributor")
                                .populate('id_distributor')
                                .sort({quantity: -1})
                                .skip(0)
                                .limit(2)
        res.json({
            "status": 200,
            "messenger": "Danh sach Fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})

// Get ds Fruits co chu cai bat dau ten la A hoac Z
router.get('/get-list-fruit-have-name-a-or-z', async(req, res) => {
    try {
        const query = {$or: [
            {name: {$regex: 'C'}},
            {name: {$regex: 'N'}},
        ]}

        const data = await Fruits.find(query, "name quantity price id_distributor")
                                .populate('id_distributor')

        res.json({
            "status": 200,
            "messenger": "Danh sach fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})

// API cap nhat fruit
router.put('/update-fruit-by-id/:id', async(req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const updatefruit = await Fruits.findById(id)
        let result = null;
        if(updatefruit) {
            updatefruit.name = data.name ?? updatefruit.name,
            updatefruit.quantity = data.quantity ?? updatefruit.quantity,
            updatefruit.price = data.price ?? updatefruit.price,
            updatefruit.status = data.status ?? updatefruit.status,
            updatefruit.image = data.image ?? updatefruit.image,
            updatefruit.description = data.description ?? updatefruit.description,
            updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor

            result = await updatefruit.save();
        }
        if(result){
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "Cập nhật không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;