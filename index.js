const express = require("express") 
const mysql = require("mysql2/promise")
const app = express()


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",   
    database: "infinity_games",
    waitForConnections: true
})

app.use(express.json())

app.get("/games", async (req,res)  => {
    const[rows] = await pool.execute("SELECT * FROM games")
    res.json(rows)
})

app.get("/games/:id", async (req,res) => {

    const id = req.params.id
    const[rows] = await pool.execute("SELECT * FROM games WHERE id = ?", 
    [id])


     if(rows.length === 0) {
        return res.status(404).json({mensagem: "Jogo não encontrado"})
    }
    

    res.json(rows)
})


app.get("/genero", async (req,res) => {
    const [rows] = await pool.execute("SELECT * FROM generos")
    res.json(rows)
})

app.post("/games", async (req,res) => {
    const {nome , desenvolvedora, sinopse, id_genero} = req.body
    if(!nome || !desenvolvedora || !sinopse || !id_genero){
        return res.status(400).json({error: "Nome Desenvolvedora sinopse e id_genero São obrigatorios"})
    }

    const[resultado] = await pool.execute("INSERT INTO games (nome, desenvolvedora, sinopse, id_genero) VALUES (?,?,?,?)",
    [nome, desenvolvedora, sinopse, id_genero])
    return res.status(201).json({id: resultado.insertId, nome, desenvolvedora, sinopse, id_genero})
})


app.post("/genero", async (req,res) => {
    const{nome, descricao} = req.body
    if(!nome || !descricao){
        return res.status(400).json({error: "Nome e Descrição São obrigatorios"})
    }

    const[resultado] = await pool.execute("INSERT INTO generos (nome, descricao) VALUES(?,?)",
    [nome,descricao])
    return res.status(201).json({id: resultado.insertId, nome, descricao})
})


app.delete("/games/:id", async (req,res) => {
    const id = req.params.id
    const [resultado] = await pool.execute("DELETE FROM games WHERE id = ?",
    [id])

    if(resultado.affectedRows === 0){
        return res.status(404).json({error: "Jogo não encontrado"})
    }

    return res.status(200).json({mensagem: "Jogo removido com sucesso"})

})



app.delete("/genero/:id", async (req,res) =>  {
    const id = req.params.id
    const [resultado] = await pool.execute("DELETE FROM generos WHERE id = ?",
    [id])

    if(resultado.affectedRows === 0) {
        return res.status(404).json({error: "Gênero não encontrado"})
    }

    return res.status(200).json({mensagem: "Gênero removido com sucesso!"})
})

app.put("/games/:id", async (req,res) => {
    const id = req.params.id
    const {nome, desenvolvedora, sinopse, id_genero, } = req.body
    
    if(!nome || !desenvolvedora || !sinopse || !id_genero){
        return res.status(400).json({error: "Nome Desenvolvedora sinopse e id_genero São obrigatorios"})
    }

    const [resultado] = await pool.execute("UPDATE games SET nome = ?, desenvolvedora = ?, sinopse = ?, id_genero = ? WHERE id = ?",
    [nome, desenvolvedora, sinopse, id_genero, id] )

    if(resultado.affectedRows === 0){
        return res.status(404).json({error: "Jogo não encontrado"})
    }

    return res.json({id, nome, desenvolvedora, sinopse, id_genero})
 })

app.listen(3000, () => console.log("API rodando :)"))