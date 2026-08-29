const CodingStats = require("../models/CodingStats");

const getCodingStats = async (req, res, next) => {
  try {
    const stats = await CodingStats.getAllCodingStats();

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

const getCodingStatsById = async (req, res, next) => {
  try {
    const stats =
      await CodingStats.getCodingStatsById(req.params.id);

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Coding statistics not found"
      });
    }

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCodingStats,
  getCodingStatsById
};