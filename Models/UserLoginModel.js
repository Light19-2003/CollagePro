import mango from 'mongoose';




const UserLoginSchema = new mango.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mango.model('UserLogin', UserLoginSchema);