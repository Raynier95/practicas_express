// Nota: se puede eliminar el JSON.stringofy de res.send ya que lo envia en ese formato
// para asegurarse que se esta enviando realmente un formato JSON se puede usar res.json
// Indagar en res.end
const express = require('express')
const {programacion} = require('../JSON/cursos.js').cursos
const routerProgramacion = express.Router()
// nos va a permitir procesar el cuerpo de la solicitud en formato JSON
// y poder trabajar con el cuerpo de esa solicitud en el codigo
// Middleware
routerProgramacion.use(express.json())
// Programacion
// Se deja el camino principal "/" ya que se esta accediendo gracias al router
routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(programacion))
})
// Parametos de ruta ---> :lenguaje
// Dejamos los parametros de ruta ya que estamos accediendo a la info gracias al router
routerProgramacion.get('/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje //extraemos la informacion del parametro
    const resultados= programacion.filter(curso => curso.lenguaje === lenguaje)
    if(resultados.length===0) return res.status(404).send(`No se encontraron cursos de ${lenguaje}`)
    return res.send(JSON.stringify(resultados))

})
routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
    const lenguaje = req.params.lenguaje //extraemos la informacion del parametro
    const nivel = req.params.nivel
    const resultados= programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)
    if(resultados.length===0) return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    return res.send(JSON.stringify(resultados))

})
// manejando otros metodos: POST,PUT,PACHT y DELETE
// POST
routerProgramacion.post('/',(req,res)=>{
    // Obtenemos el cuerpo de la solicitud
    let cursoNuevo = req.body
    // añadimos el curso nuevo
    programacion.push(cursoNuevo)
    // Se muestra en pantalla
    res.send(JSON.stringify(programacion))
})
// PUT
routerProgramacion.put('/:id',()=>{
    // Obtenemos el cuerpo de la solicitud
    const cursoActualizado = req.body
    // Obtenemos el ID
    const id = req.params.id
    // buscamos que el id introducido sea igual a uno del que esta en el objeto JSON
    const indice = programacion.findIndex(curso => curso.id == id) //usamos == para evitar errores
    if(indice >= 0){
        programacion[indice] = cursoActualizado
    }
    res.send(JSON.stringify(programacion))
})
// PATCH
routerProgramacion.patch('/:id',()=>{
    const infoActualizada = req.body
    const id = req.params.id
    const indice = programacion.findIndex(curso => curso.id == id)
    if(indice>=0){
        const modificarCurso = programacion[indice]
        Object.assign(modificarCurso,infoActualizada)
    }
    res.send(JSON.stringify(programacion))
})
// DELETE
routerProgramacion.delete('/:id',(req,res)=>{
    const id = req.params.id
    const indice = programacion.findIndex(curso=>curso.id == id)
    if(indice>=0){
        programacion.splice(indice,1)
    }
    res.send(JSON.stringify(programacion))
})
module.exports.routerProgramacion = routerProgramacion