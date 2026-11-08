const express = require('express');
const router = express.Router();
const Person = require('../Models/Person');
router.post('/', async (req, res) => {
    try {
        // Get data from request body
        const data = req.body;

        // Create new person document
        const newPerson = new Person(data);

        // Save data in MongoDB
        const savedPerson = await newPerson.save();

        console.log("Data saved successfully");

        res.status(201).json(savedPerson);

    } catch (error) {
    console.error("Actual Error:", error);

    res.status(500).json({
        error: error.message
    });

}
});
router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;

    if (
      workType === 'chef' ||
      workType === 'manager' ||
      workType === 'waiter'
    ) {
      const response = await Person.find({ work:workType });

      console.log('response fetched');
      res.status(200).json(response);

    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async(req,res)=>{
  try{
    const personId = req.params.id;//Exteact the id from the url parameter
    const updatedPersondata = req.body;
    const response =await  Person.findByIdAndUpdate(personId,updatedPersondata,{
      new :true,//Return the updated document

      runValidators:true,// Run Mongoose validation
    
    })

    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }
    console.log('dara updated');
    res.status(200).json(response)

  }catch(err){
 console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

router.delete('/:id', async (req, res) => {
    try {
        // Extract ID from URL
        const personId = req.params.id;

        // Find and delete person
        const response = await Person.findByIdAndDelete(personId);

        // Check if person exists
        if (!response) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }

        console.log('Person deleted successfully');

        res.status(200).json({
            message: 'Person deleted successfully',
            deletedPerson: response
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
});


module.exports = router;