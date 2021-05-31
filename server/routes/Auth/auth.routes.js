const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User/User');
const router = Router();



router.post(
    '/register',
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email: email});

        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже есть'});
        }
        const user = new User({email: email, password: password});
        await user.save();

        res.status(201).json({message: 'Пользователь создан'});
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так'});
    }
});


router.post(
    '/login',
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                });
            }

            const {email, password} = req.body;
            const user = await User.findOne({email: email});

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'});
            }
            if (!password) {
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id});
        } catch(e) {
            res.status(500).json({message: 'Что-то пошло не так'});
        }
});

module.exports = router;
