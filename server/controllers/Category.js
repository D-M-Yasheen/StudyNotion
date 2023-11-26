const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "All required are reqried."
            })
        }

        const category = await Category.create({ name, description });

        res.status(200).json({
            success: true,
            data: category,
            message: "Category is created successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while creating a Category."
        })
    }
}


exports.showAllCategorys = async (req, res) => {
    try {
        const getAllCategorys = await Category.find({}, { name: true, description: true });

        res.status(200).json({
            success: true,
            data: getAllCategorys,
            message: "All Categorys are fetched successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while fetching all Categorys."
        })
    }
}


exports.categoryPageDetails = async (req, res) => {
    try {

        const { categoryId } = req.body;

        const selectCategory = await Category.findById(categoryId).populate({
            path: "courses",
            match: { status: "Published" },
            populate: { path: 'ratingAndReviews' },
            populate: {
                path: 'instructor'
            }
        }).exec();

        if (!selectCategory) {
            return res.status(404).json({
                success: false,
                message: "Data not found."
            })
        }

        if (selectCategory?.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found in this category."
            })
        }

        // learn about the below thing 

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        }).populate({
            path: "courses",
            match: { status: 'Published' },
            populate: {
                path: 'instructor'
            }
        }
        );


        let differentCourses = [];

        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category?.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate({
            path: "courses",
            match: { status: "Published" },
            populate: {
                path: 'instructor'
            }
        }
        );

        const allCourses = allCategories.flatMap((category) => category.courses)

        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        res.status(200).json({
            selectedCourses: selectCategory,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while fetching category details"
        })
    }
}