// import User from '../models/userModel.js';
// import requestResponse from '../response.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Cari pengguna berdasarkan email
//     const user = await User.findOne({ email });

//     // Jika pengguna tidak ditemukan, kirim respon dengan status 400
//     if (!user) {
//       return res.status(400).json(requestResponse.failed("Invalid email or password"));
//     }

//     // Periksa kecocokan password menggunakan bcrypt
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json(requestResponse.failed("Invalid email or password"));
//     }

//     // Buat token JWT
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Kirim respon dengan token
//     res.json(requestResponse.success({ token }));
//   } catch (error) {
//     res.status(500).json(requestResponse.failed(error.message));
//   }
// };

// export default login;
