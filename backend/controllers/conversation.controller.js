import createError from "../utils/error.js"
import Conversation from "../models/conversation.model.js"

export const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
        id: req.isRecruiter ? req.userId + req.body.to : req.body.to + req.userId,
        CompanyId: req.isRecruiter? req.userId : req.body.to,
        ApplicantId: req.isRecruiter? req.body.to : req.userId,
        readByCompany: req.isRecruiter,
        readByApplicant: !req.isRecruiter,
    })

    try {
        const savedConversation = await newConversation.save()
        res.status(201).send(savedConversation)

    } catch (error) {
        next(error)
    }    
}

export const getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find(
            req.isRecruiter? {companyId: req.userId} : {ApplicantId: req.userId}
        ).sort({updatedAt:-1})

        res.status(200).send(conversations)
    } catch (error) {
        next(error)
    }    
}

export const getSingleConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({id:req.params.id});
        if (!conversation) return next(createError(404, "Not found"))
        res.status(200).send(conversation);
    } catch (error) {
        next(error)
    }    
}

export const updateConversation = async (req, res, next) => {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate({id:req.params.id},{
                $set: {
                    readByCompany: true,
                    readByApplicant: true,
                }},
                {new: true}
            )

        res.status(200).send(updatedConversation)
    } catch (error) {
        next(error)
    }    
}