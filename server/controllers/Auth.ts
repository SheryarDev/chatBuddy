import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth";
import multer from "multer";



const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();

const storage = multer.memoryStorage();
const upload: any = multer({ storage: storage });

// router.post(
//     "/signup",
//     body("email").isEmail().withMessage("The email is invalid"),
//     body("password").isLength({ min: 5 }).withMessage("The password is invalid"),
 export const signup= async (req:any, res:any) => {
        try {
            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                const errors = validationErrors?.array().map((error) => {
                    return {
                        msg: error?.msg,
                    };
                });

                return res.json({ errors, data: null });
            }

            const { name, email, password } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                return res.json({
                    errors: [
                        {
                            msg: "Email already in use",
                        },
                    ],
                    data: null,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            const token = JWT.sign(
                { email: newUser.email },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: 360000,
                }
            );

            res.json({
                errors: [],
                data: {
                    token,
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    },
                },
            });
        } catch (error: any) {
            res.status(500).json({ message: error?.message });
        }
    }


export const login=async (req:any, res:any) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                errors: [
                    {
                        msg: "User Not Registered",
                    },
                ],
                data: null,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                errors: [
                    {
                        msg: "Invalid credentials",
                    },
                ],
                data: null,
            });
        }

        const token = JWT.sign(
            { email: user.email },
            process.env.JWT_SECRET as string,
            {
                expiresIn: 360000,
            }
        );

        return res.json({
            errors: [],
            data: {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error?.message });
    }
}

export const me= async (req:any, res:any) => {
    try {
        const user = await User.findOne({ email: req.user });
        if (user) {
            return res.json({
                errors: [],
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                    },
                },
            });
        }


    } catch (error: any) {
        res.status(500).json({ message: error?.message });
    }
}

// Password reset request
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        const tokenExpirationTime = new Date();
        tokenExpirationTime.setHours(tokenExpirationTime.getHours() + 1);
        user.resetPasswordExpires = tokenExpirationTime; // Token expires in 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "",
                pass: "",
            },
        });

        const mailOptions = {
            from: "LuckyMe",
            to: email,
            subject: "Password Reset Request",
            // text: `Hi ${user.name},\n\n
            //   You are receiving this email because you requested a password reset for your account.\n
            //   Please use the following link to reset your password:\n
            //   http://localhost:3000/app/reset-password/${token}\n
            //   This password reset link will expire in one hour.\n\n
            //   If you did not request a password reset, please ignore this email and your password will remain unchanged.\n\n
            //   Best regards,\n
            //   LuckyMe Team`,

            html: `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Comfortaa:wght@400;500;600;700&family=Oxygen:wght@700&family=Poppins:wght@400;500;600&family=Roboto+Mono:ital,wght@0,400;0,700;1,500&display=swap"
                rel="stylesheet">
            <title>Email</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                }

                .container {
                    width: 500px;
                    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
                    padding: 10px;
                }

                .btn {
                    background-Color: orangered;
                    text-decoration: none!important;
                    padding: 10px;
                    color: white!important;
                    margin: 50px auto;
                    display: block;
                    text-align: center;
                    width: 200px;
                    font-size: 20px;

                }

                footer {
                    text-align: center;
                    color: orangered!important;
                }
                h1{
                    margin-bottom: 30px;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>Hi ${user.name}</h1>
                <h4>A request has been received to change password of your LuckyMe Account</h4>
                <a href="http://localhost:3000/app/reset-password/${token}" class="btn">Reset password</a>
                <p>If you did not request a password reset, please ignore this email and your password will remain unchanged.
                </p>
                <p>Best Regards</p>
                <p>LuckyMe Team</p>
                <footer>
                    <p>CopyWrite@LuckyMe.loop.net</p>
                </footer>
            </div>

        </body>
        </html>`,
        };

        transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error sending email" });
            }

            console.log(`Email sent: ${info.response}`);
            res.json({ message: "Password Reset Link Sent To Your email " });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Password reset
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const { token } = req.params;

        const user: any = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export const getUser= async (req:any, res:any) => {
    try {
        const user = await User.findOne({_id:req.params.userId})

        return res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error?.message });
    }
}


export const getAllUser= async (req:any, res:any) => {
    try {
        const user = await User.find({}).select("name email")
        return res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error?.message });
    }
}


export default router;
