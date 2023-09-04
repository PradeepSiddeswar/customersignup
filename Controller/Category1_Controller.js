const Category1 = require('../Model/Category1_Model')


exports.create = async (req, res) => {
    try {
        const { name, offers, selecteCategories } = req.body;
        const image = req.file ? req.protocol + '://' + req.get('host') + '/upload/' + req.file.filename : '';

        const category = new Category1({ name, offers, selecteCategories, image });

        await category.save();

        // Include the image path in the response
        const responseData = {
            _id: category._id,
            name: category.name,
            selecteCategories: category.selecteCategories,
            image: category.image, // Include the image path
            offers: category.offers,
            __v: category.__v
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category' });
    }
};


// exports.create = async(req, res) => {
//     console.log(req.body);
//     console.log(req.protocol + "://" + req.get("host"), "url")
//     if(!req.body) {
//         res.status(400).send("Content Connt Be Empty")
//         return
//     }
//     const category = new Category1({
//         // name: req.body.name,
//         selecteCategory: req.body.selecteCategory,
//         image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "", 
//         offers: req.body.offers,
//         // description: req.body.description,
//         tagline: req.body.tagline,
//     })
//     category.save(category)
//                    .then(data => {
//                     res.status(200).send(data)
//                    })
//                    .catch(error => {
//                     res.status(500).send({
//                         message: error
//                     })
//                    })
// }



exports.getallCategories = async (req, res) => {
    try { 
        const categories = await Category1.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({ error: 'Error retrieving categories'})
    }
};

exports.delete = (req, res) => {
    const id = req.params.id
    Category1.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`category not found with ${id}`)
            } else {
                res.send("category deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}