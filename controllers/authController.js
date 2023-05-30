import User from '../models/userModel.js';
import requestResponse from '../response.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if(!user) return res.status(404).json(requestResponse.failed('User not found'));

    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(400).json(requestResponse.failed('Incorrect password'));
    
    req.session.userId = user.uid;

    const { uid, name, email } = user;
    const data = { uid, name, email };

    res.status(200).json(requestResponse. successWithData('Login success!', data))
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(400).json(requestResponse.failed('Logout failed!'));
        res.status(200).json(requestResponse.success('Logout success!'));
    })
}