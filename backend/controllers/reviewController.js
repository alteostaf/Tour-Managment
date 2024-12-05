import Tour from "../models/Tour.js";
import Review from "../models/Review.js";


export const createReview = async(req,res) =>{
  const tourId = req.params.tourId
  const newReview = new Review({...req.body})
  try{
      const savedReview = await newReview.save()

      await Tour.findByIdAndUpdate(tourId,{
        $push:{reviews:savedReview._id}
      })

      res.status(200).json({
        success:true,
        message:'review submitted'
      })
  } catch(err) {
    res.status(500).json({
      success:false,
      message:'failed to submit'
    })

  }
}

export const getReviews = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    
    const tour = await Tour.findById(tourId).populate('reviews');
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      reviews: tour.reviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
};