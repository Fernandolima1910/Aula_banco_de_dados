
const pool = require('./db')

async function consultar() {
    const resultado = await pool.query(`INSERT INTO users(name_users, email_users, password_users) VALUES( ${nome}, ${email}, ${senha})`);
    console.log(resultado.rows)
}

