import Favorite from "../models/favorite.model.js"

export const findFavoriteNumber = async (req, res, next) => {
    Favorite.find({"jobId": req.body.jobId})
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, FavoriteNumber: favorite.length})
    })
};

export const findFavorited = async (req, res, next) => {
    Favorite.find({"jobId": req.body.jobId,  "userFrom": req.body.userFrom
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)
        
        let result = false
        if(favorite.length !==0){
            result = true
        }
        res.status(200).json({ success: true, favorited: result})

    })
})
    
};

export const addToFavorite = async (req, res, next) => {
    //save to db
   const favorite = new Favorite(req.body)
   try {
    const savedJob = await favorite.save();
    res.status(201).json(savedJob);
} catch (err) {
    next(err)
}
}
    
export const removeFromFavorite = async (req, res, next) => {
    //save to db
    Favorite.findOneAndDelete({ jobId: req.body.jobId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if(err){
            return res.status(400).json({success: false, err})
        }else {
            res.status(200).json({ success: true, doc})
        }
    })
}

export const getFavoriteJobs = async (req, res, next) => {
    //save to db
    Favorite.find({ 'userFrom' : req.body.userFrom})
    .exec((err, favorites) => {
        if(err){
            return res.status(400).send(err)
        }else {
            res.status(200).json({ success: true, favorites})
        }
    })
}
    
