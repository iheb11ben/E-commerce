const bcrypt = require('bcrypt')
const Admin = require('../Models/Admin');
const Customer = require('../Models/Customer');
const Provider = require('../Models/Provider');
const check_auth=require('../Middlwares/check_auth')
const { randomBytes } = require('crypto');
const DOMAIN = process.env.APP_DOMAIN
const { join } = require('path')

const sgMail = require('@sendgrid/mail');
const User = require('../Models/User');
const HOST_MAIL = process.env.APP_HOST_MAIL;
const SENDGRID = process.env.APP_SENDGRID_API;
sgMail.setApiKey(SENDGRID);
const jwt=require('jsonwebtoken')
var RefreshTokens=[];
const SECRET=process.env.APP_SECRET





registerAdmin = async (req, res) => {
    try {
        req.body['picture'] = req.file.filename;
        const password = bcrypt.hashSync(req.body.password, 10);
        const newadmin = new Admin({
            ...req.body, password,
            verified:true,
        }); //instance
        const admin = await Admin.create(newadmin);
        res.status(201).json({
            message: 'admin created',
            data: admin,
        })
    } catch (error) {
        return res.status(406).json({
            message: error.message
        });
    };
};
registerCustomer = async (req, res) => {
    try {
        req.body['picture'] = req.file.filename;
        const password = bcrypt.hashSync(req.body.password, 10);
     
        const newcustomer = new Customer({
            ...req.body, password,
            verified:false,
            verificationcode: randomBytes(6).toString('hex'),
        });
        await Customer.create(newcustomer);
        res.status(201).json({
            message: 'customer created',
            data: newcustomer,
        });
        sgMail.send({
            text: 'please verify your account ',
            subject: 'Verify account',
            to: newcustomer.email,
            from: HOST_MAIL,
            html: `
                <div>
                    <h2>Hello ${newcustomer.fullname}!</h2>
                    <p>We're glad to have you on board at  ${newcustomer.email}!</p>
                    <a href="${DOMAIN}verify-now/${newcustomer.verificationcode}">verify Email</a>
                </div>
                `
        },
            (err) => {
                if (err) {
                    console.log('error mailing', err.message);
                } else {
                    console.log('Mailing send:');
                };
            }
        )
    }
    catch (error) {
        res.status(406).json({
            message: error.message
        });
    };
};
registerProvider = async (req, res) => {
    try {
        req.body['picture'] = req.file.filename;
        const password = bcrypt.hashSync(req.body.password, 10);
        const newprovider = new Provider({
            ...req.body, password,
        }); //instance
        const provider = await Provider.create(newprovider);
        res.status(201).json({
            message: 'provider created',
            data: provider,
        })
    } catch (error) {
        return res.status(406).json({
            message: error.message
        });
    };
};
verifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.params;
        const user = await User.findOne({
            verificationCode,
        });
        user.verified = true;
        user.verificationcode = undefined;
        user.save();
        return res.sendFile(join(__dirname, '../Template/success.html'));
    } catch (error) {
        res.sendFile(join(__dirname, '../Template/error.html'))
    }
};
login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
        })
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'email not found'
            });
        }
        if (user.verified === true) {
            const passwordCompare = bcrypt.compareSync(password, user.password);
            if (!passwordCompare) {
                return res.status(404).json({
                    status: 404,
                    message: 'password incorrect !'
                })
            }
            const token=jwt.sign({
                id:user._id,
                user:user,
            },
            SECRET,{expiresIn:'7 days'});
            const result={email:user.email,
            user:user,
        token:token,
        expiresIn:1,
    };
            return res.status(200).json({
               ...result,
                message: 'you are now logged in.',
                success: true,
            })
        } else {
            return res.status(404).json({
                message: 'you are not verified.',
                success: true,
            })
        }

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: error.message,
        });

    }
}
profile = async (req,res)=>{
    try {
        const user=req.user;
        res.status(200).json({user:user,});
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
updateProfile = async (req, res) => {
    try {
        
        await User.updateOne({ _id: req.user._id }, req.body);
        res.status(200).json({
            message: 'Profile Updated',

        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
forgotpassword = async (req,res) => {
    try {
       const email = req.body.email;
       const user = await User.findOne({ email });
       if (!user){
           return res.status(400).json({
               message: 'email does not exist',
           });
       }
       const token = jwt.sign({ _id: user._id },SECRET,{ expiresIn: '24h'});
        // console.log(token);
        await User.findOneAndUpdate(
            { email:email },
            { resetPasswordToken: token }
        );
        sgMail.send(
            {
                to:email,
                subject: 'Forget Password',
                text: 'bonjour mr',
                from: HOST_MAIL,
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <a href="${DOMAIN}reset/${token}"> reset password</a>
                </body>
                </html>`
            },
            (err) => {
                if (err) { console.log('error mailing',err.message);
                    
                }else{console.log('Mailing sent')};
            }

        );
        return res.status(200).json({
            message:'hurry',
        })
    } catch (error) {
        return res.status(406).json({
            message: error.message
        });
    }
}
resetpassword=async (req,res)=> {
    try {
        const resetPasswordToken=req.params.resetPasswordToken;
        if(resetPasswordToken){
            jwt.verify(resetPasswordToken,SECRET, async err =>{if (err)
        {return res.json({error:'incorrect token or it is expired',})}
            })
        }
        const user =await User.findOne({resetPasswordToken:resetPasswordToken,});
        user.password=bcrypt.hashSync(req.body.newPass,10);
        user.resetPasswordToken=undefined;
        user.save();
        return res.status(200).json({
            message:'password updated'
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        });
        
    }
};

module.exports = { registerAdmin, registerCustomer, registerProvider, verifyEmail, login ,profile,updateProfile,forgotpassword,resetpassword }
