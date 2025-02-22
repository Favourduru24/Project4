import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {type:String, required: [true, 'Email is required.'], unique: [true, 'Email already exists.']},
     username:{ type: String, required: true, unique: true},
     photo: {type: String, required: true}
})


const User = models.User || model('User', UserSchema)

 export default User