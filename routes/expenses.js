const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Expense = require('../models/Expense');

// Middleware to verify token and extract user ID
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// @route   GET /api/expenses
// @desc    Get all expenses for logged-in user
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    
    let query = { user: req.userId };
    
    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    // Filter by category if provided
    if (category && category !== 'All') {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses
    });

  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses'
    });
  }
});

// @route   GET /api/expenses/:id
// @desc    Get single expense
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      expense
    });

  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching expense'
    });
  }
});

// @route   POST /api/expenses
// @desc    Create new expense
// @access  Private
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, and category'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    const expense = await Expense.create({
      user: req.userId,
      title,
      amount,
      category,
      date: date || Date.now(),
      description
    });

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense
    });

  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating expense'
    });
  }
});

// @route   PUT /api/expenses/:id
// @desc    Update expense
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // Find expense
    let expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Update fields
    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = date;
    if (description !== undefined) expense.description = description;

    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      expense
    });

  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating expense'
    });
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete expense
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });

  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting expense'
    });
  }
});

// @route   GET /api/expenses/stats/summary
// @desc    Get expense statistics
// @access  Private
router.get('/stats/summary', authenticate, async (req, res) => {
  try {
    // Get current month's expenses
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const expenses = await Expense.find({
      user: req.userId,
      date: { $gte: startOfMonth }
    });

    // Calculate total spent
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Category-wise breakdown
    const categoryStats = {};
    expenses.forEach(exp => {
      if (!categoryStats[exp.category]) {
        categoryStats[exp.category] = 0;
      }
      categoryStats[exp.category] += exp.amount;
    });

    res.status(200).json({
      success: true,
      stats: {
        totalSpent,
        expenseCount: expenses.length,
        categoryStats
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;