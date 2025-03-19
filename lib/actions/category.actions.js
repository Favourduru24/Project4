"use server"

import Category from "../database/models/category.model"
import { connectToDatabase } from "../database"
import { handleError } from "../utils"

export const dynamic = "force-dynamic"; // Ensure this runs dynamically

export const createCategory = async ({categoryName}) => {
  try {

     connectToDatabase()

     const newCategory = await Category.create({
        name: categoryName
     })

      return JSON.parse(JSON.stringify(newCategory))
    
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategory = async () => {
  try {

     connectToDatabase()

     const categories = await Category.find()

      return JSON.parse(JSON.stringify(categories))
    
  } catch (error) {
    handleError(error)
  }
}


 


  