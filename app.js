const express = require('express')
const {cursos} = require('./JSON/cursos.js')
const app = express()
// Routers
// Los routers van a su respectivo archivo
// Usamos routerProgramacion en lugar de app
// Routers Programacion
const {routerProgramacion} = require('./routers/programacion.js')
app.use('/api/cursos/programacion',routerProgramacion)
// Routers Matematicas
const {routerMatematica} = require('./routers/matematica.js')
app.use('/api/cursos/matematicas',routerMatematica)
// Routing
app.get('/',(req,res)=>{
    res.send('Primer servidor utilizando EXPRESS')
})
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(cursos))
})
// indagar en el process.env.PORT
const PUERTO = process.env.PORT || 3000
app.listen(PUERTO,()=>{
    console.log(`Servidor a la escucha en el puerto ${PUERTO}`)
})
