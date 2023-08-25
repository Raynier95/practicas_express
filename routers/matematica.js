const express = require('express')
// Asignamos una constante usando destructuracion para requerir el contenido de cursos
// AL usar este metodo podemos simlemente escribir matematicas para acceder a la infos
const {matematicas} = require('../JSON/cursos.js').cursos 
const routerMatematica = express.Router()
// Matematicas
routerMatematica.get('/',(req,res)=>{
    res.send(JSON.stringify(matematicas)) //de otra manera seria cursos.matematicas
})
routerMatematica.get('/:tema',(req,res)=>{
    const tema = req.params.tema //extraemos la informacion del parametro
    const resultados= matematicas.filter(curso => curso.tema === tema)
    if(resultados.length===0) return res.status(404).send(`No se encontraron cursos de ${tema}`)
    return res.send(JSON.stringify(resultados))

})
// exportamos nuestro router
module.exports.routerMatematica=routerMatematica
// module.exports={
//     routerMatematica:routerMatematica
// }