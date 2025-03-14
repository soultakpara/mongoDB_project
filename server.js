// parametrage du serveur express

const express= require('express')
const app= express()
const port= process.env.port||3030
const bodyParser= require('body-parser')
app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://takparasoulemane:SOUL229@cluster0.tooqy.mongodb.net//taskDB')
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur de connexion", err));


//   schema et model mongoose
const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// model

const TASK = mongoose.model('TASK', Schema);
// creation des tâches 

// Lire la liste des tâches (GET /tasks) 


app.get ('/task', async (req, res) =>{
try {
    const taches = await TASK.find();
    res.json(taches)
} catch (error) {
    res.status(500).json('taches intouvable')
}    
    
});

app.get ('/task/:id', async (req, res) =>{
    try {
        const taches = await TASK.findById(req.params.id);
        res.json(taches)
    } catch (error) {
        res.status(500).json({message:'taches intouvable'})
    }    
        
    });

    app.post('/task', async(req , res)=>{
        try {
            const tacheAjouter= new TASK({
                name:req.body.name,
                description: req.body.description
            });
            await tacheAjouter.save()
            res.status(201).json('tache ajoutée')
        } catch (error) {
            res.status(400).json({message:'taches non ajoutée'})
        }
    });

    app.put('/task/:id' , async (req, res)=>{
      try {
        const tacheModifier= TASK.findByIdAndUpdate(req.params.id, {
            name:req.body.name},{ description:req.body.description}
    );
    res.status(201).json("tache mise a jour",tacheModifier)
      } catch (error) {
        res.status(404).json({message:'la tache est introuvable'})
      }
    });

    app.delete('/task/:id' , async (req, res)=>{
        try {
            const tacheSupprimer=TASK.findByIdAndDelete(req.params.id);
            res.status(200).json('tache supprimée')
        } catch (error) {
            res.status(404).json(' tache introuvable')
        }
    });





app.listen(port,(req,res)=>{
    console.log(`Serveur demarrer sur http:localhost:${port}`)} );