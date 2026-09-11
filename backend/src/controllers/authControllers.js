const pool = require("../config/db");

const bcrypt = require('bcryptjs');

require('dotenv').config();

async function register( req, res){
    const {name, email, password} = req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({error: 'Todos os campos são obrigatorios'});
        }
        const userExist = await pool.query(`SELECT id_users FROM users WHERE email_users = $1`,[email]); // Verificar o possivel erro

        if(userExist.rows.length > 0 ){
            return res.status(409).json({error: 'Email já existente, tente outro email'});
        }

        const password_hash = await bcrypt.hash(password, 10) // está criptografando a senha( e o 10 está colocando a força da criptografia)

        const result = await pool.query(
            `INSERT INTO users(name_users, email_users, password_users)
            VALUES($1, $2, $3)
            RETURNING id_users, name_users, email_users, created_art` ,
            [name , email, password_hash]);

            return res.status(201).json(result.rows[0]);
    }
}