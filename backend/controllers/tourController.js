import Tour from "../models/Tour.js";

// Create a new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

// Update a tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// Get a single tour by ID
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving tour",
    });
  }
};

// Get all tours 
export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;
  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get tours",
    });
  }
};

// Search tours
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, 'i');
  const distance = parseInt(req.query.distance, 10);
  const maxGroupSize = parseInt(req.query.maxGroupSize, 10);
  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get tours",
    });
  }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get tours",
    });
  }
};

// Get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.countDocuments({ featured: true });
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to count" });
  }
};
