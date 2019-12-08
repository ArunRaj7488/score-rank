const router = require('express').Router();
const { User, validateUser } = require('../models/user-info');

assingRankAndReturn = (res) => {
      User.find().sort("-score").exec(async (err, data)=>{
      let newData = [];
      for(let i in data){
        await User.findByIdAndUpdate(data[i]._id, {rank: parseInt(i) + 1});
        dataObj = {...data[i]._doc, rank: parseInt(i)+1};
         newData.push(dataObj);
       }
      return res.send({status:true, error:false, totalUsers: newData.length, userData: newData });
  });
}

router.get('/', async(req, res) => {
   return assingRankAndReturn(res);
});

router.get('/:employeeId', async(req, res) => {
      const user = await User.find(req.params.employeeId);
      if(!user) return res.status(404).send('given employeeId is not found');
      res.send(user);
    });

router.post('/', async(req, res) => {

    const { error } = validateUser(req.body);
    if(error) return res.status(404).send(`Error: ${error.details[0].message}`);

    const empId = await User.findOne({employeeId: req.body.employeeId});
    if(empId) return res.status(400).send('User already exist');

    const user = new User(req.body);
    await user.save(user);
    return assingRankAndReturn(res);

});
router.put('/:id',async(req,res) => {

    const user = await User.findByIdAndUpdate( req.params.id, req.body);
    if(!user) return res.status(404).send("user Id is not find");
    return assingRankAndReturn(res);
});

router.delete('/:id', async(req, res) =>{
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user) return res.status(404).send("user Id is not find");
  return assingRankAndReturn(res);
});

module.exports = router;