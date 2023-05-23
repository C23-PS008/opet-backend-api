import User from '../models/userModel.js';
import requestResponse from'../response.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    const {
        name, email, password
    } = req.body;

    const user = await User.findOne({ email })
    if(user) return res.status(400).json(requestResponse.failed("Email already exist!"))

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name,
            email,
            password: hashPassword,
        });
        res.status(201).json(requestResponse.success('Successfull Registration'))
    } catch (error) {
        res.status(400).json(requestResponse.failed(error.message));
    }

}
export default register;

