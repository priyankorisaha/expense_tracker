// controllers/income.js

const Income = require("../models/IncomeModel");

// Add Income
exports.addIncome = async (req, res) => {
    try {
        let { title, amount, category, description, date } = req.body;

        // Convert amount to number
        amount = Number(amount);

        // validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // create income after validation
        const income = new Income({
            title,
            amount,
            category,
            description,
            date
        });

        await income.save();
        res.status(200).json({ message: 'Income Added', income });

        console.log("Income saved:", income);
    } catch (error) {
        console.error("Error in addIncome:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Incomes
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error in getIncomes:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        console.error("Error in deleteIncome:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
