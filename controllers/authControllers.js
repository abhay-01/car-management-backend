import pkg from 'jsonwebtoken';
const { sign } = pkg;
const { hash, compare } = pkg;
import User from '../model/User.js';
import bcrypt from 'bcryptjs';

export async function signup(req, res) {
    try{
        const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.send('User registered');
    }catch(error){
        console.log("Signup error", error);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }
    const token = sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token", token);
    res.send({token });
}
