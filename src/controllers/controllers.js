const rationModel = require("../models/rationModel")
const inventoryModel = require("../models/inventoryModel")
const validator = require("email-validator");
const jwt = require("jsonwebtoken");



const createRation = async function (req, res) {
     try {
          let ration = req.body
          if (Object.entries(ration).length === 0) {
               res.status(400).send({ status: false, msg: "Kindly pass some data " })
          }
          else {
               let email = req.body.email
               if(!email)
               return res.status(400).send({status: false,msg : "Enter Valid Email"})


               let check = validator.validate(email);
               if (!check) {
                    return res.status(400).send({ status: false, msg: "Enter a valid email id" })
               }
               let mail = await rationModel.findOne({ email })
               if (mail) {
                    return res.status(409).send({ status: false, msg: "Enter Unique Email Id." })
               }

               let rationCreated = await rationModel.create(ration)
               res.status(201).send({ status: true, data: rationCreated })

          }
     }

     catch (error) {
          console.log(error)
          res.status(500).send({ status: false, msg: error.message })
     }

}

const loginUser = async function (req, res) {
     try {
          let data = req.body
          if (Object.entries(data).length === 0) {
               return res.status(400).send({ status: false, msg: "Kindly pass some data " })
          }

          let username = req.body.email
          let password = req.body.password

          if(!username)
               return res.status(400).send({status: false,msg : "Enter Valid Email"})

          if(!password)
          return res.status(400).send({status: false,msg : "Enter Valid Password"})


          let user = await rationModel.findOne({ email: username, password: password })

          if (!user) {
               return res.status(400).send({ status: false, msg: "Credentials don't match,Please Check and Try again" })
          }

          let token = jwt.sign({
               userId: user._id.toString(),
               batch: "proconnxt",
          }, "Project_1")
          res.setHeader("x-api-key", token);
          res.status(201).send({ status: true, data: token })

     }
     catch (error) {
          console.log(error)
          res.status(500).send({ status: false, msg: error.message })
     }
}


const createInventory = async function (req, res) {
     try {
          let ration = req.body
          if (Object.entries(inventory).length === 0) {
               res.status(400).send({ status: false, msg: "Kindly pass some data " })
          }
          else {
               let rationId = req.body.rationId
               if(!rationId)
               return res.status(400).send({status: false,msg : "ration Id Not Present"})

               let ration = await rationModel.findById(rationId)
               if (!ration) {
                  return  res.status(400).send({ status: false, msg: "No Such ration is Present,Please check rationId" })
               }
               else {
                    let inventoryCreated = await inventoryModel.create(inventory)
                   return res.status(201).send({ status: true, data: inventoryCreated })
               }
          }
     }
     catch (error) {
          console.log(error.message)
          res.status(500).send({ status: false, msg: error.message })
     }
}


const getInventory = async function (req, res) {

     try {
          let input = req.query
          if (!input)
               return res.status(400).send({ status: false, msg: "Please Send Some Filters" })

          let allInventory = await inventoryModel.find(input)
          if (!allInventory) {
               return res.status(404).send({ status: false, msg: "No such inventory exists" });
          }
          else {
               res.status(200).send({ status: true, msg: allInventory });
          }

     }
     catch (err) {
          console.log("this is the error:", err.message)
          res.status(500).send({ status: false, msg: err.message })
     }
};


const updateInventory = async function (request, response) {
     try {
          const id = request.params.inventoryId;
          if (!id)
               return res.status(400).send({ status: false, msg: "Please Send inventory ID" })

          const data = request.body;
          if (Object.entries(data).length === 0) {
               res.status(400).send({ status: false, msg: "Kindly pass some data " })
          }
          const fetchData = await inventoryModel.findById(id);
          if (!fetchData) {
               return res.status(404).send({ status: false, msg: "No such inventory exists" });
          }
          if (fetchData.isDeleted) {
               return response.status(404).send({status: false,msg: 'inventory Not Found !'});
          }
          data.publishedAt = new Date();
          data.isPublished = true
          const dataRes = await inventoryModel.findByIdAndUpdate(request.params.inventoryId, data, { new: true});
          return response.status(200).send({ status: true, msg: dataRes});
     } catch (error) {
          console.log("this is the error:", error.message)
          return response.status(500).send({status: false,'Error: ': error.message});
     }

}



const deleteInventory = async function (req, res) {
     try {
          let inventoryId = req.params.inventoryId;
          if (!inventoryId)
               return res.status(400).send({ status: false, msg: "inventoryId  is not valid" })

          let rationInfo = await inventoryModel.findOne({inventoryId});


          if (!inventoryInfo)
               return res.status(404).send({ status: false, msg: "No such inventory exists" });
                
               if(inventoryInfo.isDeleted)
     {
          return res.status(404).send({ status: false, msg: "No such inventory exists" });
                
     }
     
          let deleteInventory = await inventoryModel.findOneAndUpdate({ _id: inventoryId }, { $set: { isDeleted: true , deletedAt : Date.now()} }, { new: true });
          res.status(200).send({ status: true, data: deleteInventory });


     }

     catch (error) {
          console.log(error.message)
          res.status(500).send({ status: true, msg: error.message })
     }
};





module.exports.createRation = createRation
module.exports.loginUser = loginUser
module.exports.createInventory = createInventory
module.exports.getInventory = getInventory
module.exports.updateInventory = updateInventory
module.exports.deleteInventory = deleteInventory

