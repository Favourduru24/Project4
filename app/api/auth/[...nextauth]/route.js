import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
     providers: [
        GoogleProvider({
           clientId: process.env.GOOGLE_ID,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET 
        })
     ],
    callbacks: {   
        async session({session})  {
            const sessionUser = await User.findOne({
               email: session.user.email
             })
       
             session.user.id = sessionUser._id.toString()
       
             return session
       
        },
        async signIn({profile})  {
           try {
   
           await connectToDatabase()
      
           const userExist = await User.findOne({
               email: profile.email
           })
   
           if(!userExist){
               await User.create({
                   email: profile.email,
                   username: profile.name.replace(' ', '').toLowerCase(),
                   photo: profile.picture
                 
               })
           }
   
           return true
                
             } catch (error) {
               console.log(error)
                return false
             }
        }
    }
    
})

export {handler as GET, handler as POST}