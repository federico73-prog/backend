const http = require('http')
const express = require('express')
const fs = require('fs');



class Contenedor{

   constructor(nombreArchivo){

       this.nombreArchivo = nombreArchivo;

       this.items = [];

       this.open();

   }

   open(){

    try {

        if (fs.existsSync(this.nombreArchivo)){

            this.items = JSON.parse(fs.readFileSync(this.nombreArchivo,'utf-8'));

        }else{

            fs.writeFileSync( this.nombreArchivo ,JSON.stringify([]),'utf8' );

        }



    } catch (error) {

         console.log(error.message);

    }

}

async save(producto){

    try { 

           const id = this.items.length;

           this.items.push({id : id, title: producto.title, price: producto.price});

           await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.items,null,2), 'utf8')

           return id;

    }catch(error){

          return -1;

    } 

  }

}



const app = express()
const PORT = process.env.PORT || 8080;

app.get('/productos', (req,res) => {
    res.send(contenedor.items)
})

app.get('/producto-random', (req,res) => {

    let numero = parseInt(Math.random()*contenedor.items.length);
    console.log(numero)
    res.send(contenedor.items.find((item)=> item.id === numero))
})

app.listen(PORT,()=>{
    console.log(`Servidor activo y escuchando en el puerto ${PORT}`)
})


let contenedor = new Contenedor("productos.txt");

contenedor.save({title: "producto1",price: 245});

contenedor.save({title: "producto2",price: 545});

contenedor.save({title: "producto3",price: 145});
contenedor.save({title: "producto4",price: 745});