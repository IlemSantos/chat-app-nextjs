import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcryptjs from 'bcryptjs';

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String, required: true, select: false },
    image: { type: String },
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcryptjs.compareSync(plaintext, this.password));
};

export default model('user', UserSchema);
