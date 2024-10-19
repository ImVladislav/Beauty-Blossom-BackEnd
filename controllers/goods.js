// const wood = require("../WoodStorage/wood")

const { Goods } = require('../models/goods')
const { Parser } = require('json2csv'); // Пакет для перетворення JSON в CSV
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
    // const {_id: owner} = req.user;
    // const {page = 1, limit = 10} = req.query;
    // req.query обєкт параметрів пошуку
    // const skip = (page - 1) * limit;
    const result = await Goods.find();

    // const result = await Wood.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
       
    // -createdAt -updatedAt поля які не треба брати з бази
    // populate бере айді знаходить овенра і вставляє обєкт з його данними
    // 2 арг список полів які треба повернути
    // skip скілеи пропустити обєктів в базі, limit скільки повернути
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    // const result = await Book.findOne({_id: id})
    const result = await Goods.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Goods.create({ ...req.body, owner });
    //  const result = await Wood.create({...req.body});
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Goods.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const updateCheked = async (req, res) => {
    const { id } = req.params;
    const result = await Goods.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Goods.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}
const getCSV = async (req, res) => {
    try {
        const goods = await Goods.find(); // Отримати всі товари
        if (!goods.length) {
            return res.status(404).send("No goods found");
        }

        // Додаємо властивість 'link' та 'availability' до кожного товару
        const updatedGoods = goods.map(item => ({
            ...item.toObject(), // Перетворюємо товар на звичайний об'єкт
            link: `https://beautyblossom.com.ua/product/${item.id}`, // Використовуємо 'id'
            id: item._id,
            title: item.name,
            availability: item.amount > 0? 'in stock' : '',
            condition: item.new ? 'Новий' : '',


        }));

        // Визначаємо поля, які мають бути у CSV-файлі
        const fields = ['title', 'condition','id','name', 'article', 'code', 'amount', 'description', 'priceOPT', 'price', 'link', 'brand', 'images', 'country', 'new', 'sale', 'category', 'subCategory', 'subSubCategory', 'availability'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(updatedGoods); // Перетворюємо дані у CSV

        res.header('Content-Type', 'text/csv');
        res.attachment('products.csv');
        res.status(200).send(csv); // Відправляємо CSV-файл
    } catch (error) {
        console.error(error); // Логування помилок
        return res.status(500).send("Error generating CSV");
    }
};
module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateCheked: ctrlWrapper(updateCheked),
    deleteById: ctrlWrapper(deleteById),
    getCSV: ctrlWrapper(getCSV)
}