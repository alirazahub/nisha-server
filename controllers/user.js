import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: 'User does not exist', status: false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials', status: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.cookie('x-auth-admin', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        res.status(200).json({ message: 'Login successful', token, status: true })
    } catch (error) {
        res.status(500).json({ message: error.message, status: false })
    }
})

export const register = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ message: 'User already exists', status: false })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully', status: true })
    } catch (error) {
        res.status(500).json({ message: error.message, status: false })
    }
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body
    console.log(req.body)
    const user = await User.findById(req.admin.id)
    user.fullName = fullName || user.fullName
    user.email = email || user.email
    await user.save();
    res.status(200).json({ message: 'Profile Updated Successfully!',user, status: true })
})
export const updatePassword = asyncHandler(async (req, res) => {
    const { password, newPassword } = req.body
    const user = await User.findById(req.admin.id)
    if (!user) {
        res.status(400).json({ message: 'User does not exist', status: false })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials', status: false })
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password= hashedPassword
        await user.save()
        await user.save();
        res.status(200).json({message: 'Password Changed Successfully!', user, status: true })
    }
})
export const verify = asyncHandler(async (req, res) => {
    const user = await User.findById(req.admin.id)
    if (user) {
        res.status(200).json({ user, status: true })
    }
    else {
        res.status(401).json({ message: "Invalid User Data!" })
    }
})