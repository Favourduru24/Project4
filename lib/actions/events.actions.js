"use server"

import { revalidatePath } from "next/cache"
 import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"
 import Event from "../database/models/event.model"
import User from "../database/models/user.model"
import { getAllCategory } from "./category.actions"
import { handleError } from "../utils"


const populateEvent = async (query) => {
     return query
     .populate({path: 'organizer', model: User, select: "_id username lastName"})
     .populate({path: 'category', model: Category, select: "_id name"})
}

const getCategoryByName = async (name) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}


export const  createEvent = async ({userId, event, path}) => {
    try {
        await connectToDatabase()

         const organizer = await User.findById(userId)

          if(!organizer) {
            throw new Error('Organizer not found.')
          }

         const newEvent = await Event.create({...event, category: event.categoryId, organizer: organizer._id})  

         return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error) 
    }
}

export async function getAllEvent({ query, limit = 6, page, category }) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

export const getEventById = async (eventId) => {

    try{
       await connectToDatabase()
 
       const event = await populateEvent(Event.findById(eventId))
        
       if(!event) {
         throw new Error("Event not found.")
       }
       return JSON.parse(JSON.stringify(event))       
    }catch(error) {
    handleError(error)
    }
}

 export async function updateEvent({ userId, event, path }) {
    try {
      await connectToDatabase()
  
      const eventToUpdate = await Event.findById(event._id)

      if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or event not found.')
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
  }
  

        export const deleteEvent = async ({eventId, path}) => {

      try{

       await connectToDatabase()
 
       const deletedEvent = await Event.findByIdAndDelete(eventId)  
       
        if(deletedEvent) revalidatePath(path)
        
    }catch(error) {
       handleError(error)
    }
}

 export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

export async function getEventsByUser({ userId, limit = 6, page }) {
    try {
      await connectToDatabase()
  
      const conditions = {organizer: userId }
      const skipAmount = (page - 1) * limit
  
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }
