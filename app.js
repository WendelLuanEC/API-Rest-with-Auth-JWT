/*imports*/
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const port = 3000

const app = express()

// Config JSON response
app.use(express.json())

//Models
const User = require('./models/User')

//Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "bem vindo a nossa API!" })
})

app.get('/maps', (req, res) => {
    res.status(200).json({ msg: "Bem vindo aos nossos mapas, faça login para continuar" })
})

//Private Route
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id

    //Check if user exists
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" })
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

}


//Register user
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    //validations
    if (!name) {
        return res.status(422).json({ msg: 'o nome é obrigatório' })
    }

    if (!email) {
        return res.status(422).json({ msg: 'o email é obrigatório' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'o password é obrigatório' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'as senhas não conferem' })
    }

    // Check if user exists 
    const UserExists = await User.findOne({ email: email })

    if (UserExists) {
        return res.status(422).json({ msg: 'Este email já está cadastrado, utilize outro!' })
    }

    // Create password - password referente ao JWT
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create user
    const user = new User({
        name,
        email,
        password: passwordHash
    })

    try {

        await user.save()

        res.status(201).json({ msg: "Usuario criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Aconteceu um erro no servidor' })
    }

})

//Login user
app.post('/auth/login', async (req, res) => {

    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: 'o email é obrigatório' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'o password é obrigatório' })
    }

    //Check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado' })
    }

    //Check if password match
    const checkpassword = await bcrypt.compare(password, user.password)

    if (!checkpassword) {
        return res.status(422).json({ msg: 'Senha inválida' })
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id
            },
            secret,
        )
        res.status(200).json({ msg: "Autenticação realizada com sucesso", token })

    } catch (error) {

        console.log(error)
        res.status(500).json({ msg: "Aconteceu um erro no servidor" })

    }
})




//Crendecials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const admin = process.env.admin


mongoose.connect(`mongodb+srv://${admin}:${admin}@cluster0.jnvik6n.mongodb.net/?retryWrites=true&w=majority`).then(() => {

    console.log('Conectou ao banco')
}).catch((err) => console.log(err))

app.listen(port, function () {
    console.log('server is running on 3000')
})