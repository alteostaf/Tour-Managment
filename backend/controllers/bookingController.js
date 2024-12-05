import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { userId, userEmail, fullName, tourName, guestSize, phone, bookAt } = req.body;

  const newBooking = new Booking({
    userId,
    userEmail,
    fullName,
    tourName,
    guestSize,
    phone,
    bookAt,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successful",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
