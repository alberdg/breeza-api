import mongoose from 'mongoose';
mongoose.set('debug', true);
import { Password } from '../services/password';

interface UserAttrs {
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string,
  address: string,
  typeOfUser: string,
  profession: string,
  location: any,
};

// An interface that describes the properties a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build (attrs: UserAttrs): any;
  transform (user: any): any;
  transformMany (user: []): [];
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
  location: any,
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
  location: {
    type: { type: String },
    coordinates: [Number]
  }
});

userSchema.index({ location: "2dsphere" });

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

/**
 * Transforms user document to desired result
 * @function
 * @param { UserDoc } user User document
 * @returns { Object } user Expected user document
 * */
const transform = (user: UserDoc) => {
  let ret = user.toObject();
  ret.id = user._id;
  delete ret._id;
  delete ret.password;
  delete ret.__v;
  ret.longitude = ret.location?.coordinates[0];
  ret.latitude = ret.location?.coordinates[1];
  delete ret.location;
  return ret;
};

userSchema.statics.transform = transform;

userSchema.statics.transformMany = (users: any) => users.map((user: any) => transform(user));


const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };
