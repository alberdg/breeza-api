import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface describing the properties to create a new user

interface UserAttrs {
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string,
  address: string,
  typeOfUser: string,
  profession: string,
  longitude: string,
  latitude: string,
};

// An interface that describes the properties a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build (attrs: UserAttrs): any;
  transform (user: any): any;
};


// An interface that describes the properties a User document has
interface UserDoc extends mongoose.Document {
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string,
  address: string,
  typeOfUser: string,
  profession: string,
  longitude: string,
  latitude: string,
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  typeOfUser: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
});

// Not using arrow function because we don't want to override the user this value
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

userSchema.statics.transform = (user: UserDoc) => {
  let ret = user.toObject();
  ret.id = user._id;
  delete ret._id;
  delete ret.password;
  delete ret.__v;
  return ret;
}

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };
