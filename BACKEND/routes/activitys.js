//import the router in express package
const router = require("express").Router();
let Activity = require("../models/Activity");

//   http://localhost:8070/activity/add

//we have to transfer data from frontend to backend by url
//use post because no one can access to the data
router.route("/add").post((req,res) =>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email_address = req.body.email_address;
    const phone_number = Number(req.body.phone_number);
    const adults = Number(req.body.adults);
    const kids = Number(req.body.kids);
    const hotel = req.body.hotel;
    const activity_name = req.body.activity_name;
    const check_in_date = req.body.check_in_date;
    const check_out_date = req.body.check_out_date;
    const nationality = req.body.nationality;     //get the data in request body from frontend to the backend


const newActivity = new Activity({
    first_name,       //initialize the properties
    last_name,
    email_address,
    phone_number,
    adults,
    kids,
    hotel,
    activity_name,
    check_in_date,
    check_out_date,
    nationality
})

newActivity.save().then(()=>{      //pass the object to the database   
    res.json("Activity details added")   //the this to as json format to frontend
}).catch((err)=>{
    console.log(err);
})
})


//http://localhost:8070/activity
router.route("/").get((req,res)=>{
    Activity.find().then((activitys)=>{
        res.json(activitys)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res) => {
    let activityId = req.params.id;
    const {first_name, last_name, email_address, phone_number,adults,kids, hotel, activity_name, check_in_date,check_out_date,nationality}=req.body;

    const updateActivity ={
        first_name,
        last_name,
        email_address,
        phone_number,
        adults,
        kids,
        hotel,
        activity_name,
        check_in_date,
        check_out_date,
        nationality
    }
    const update = await Activity.findByIdAndUpdate(activityId, updateActivity).then(() => {

    res.status(200).send({status: "activity updated"})
    }).catch((errr) => {
    console.log(errr);
    res.status(500).send({status: "Erorr with updating data", error: errr.messsage});
    }) 
})


//http://localhost:8070/activity/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
    let activityId = req.params.id;

    await Activity.findByIdAndDelete(activityId).then(() => { 
        res.status(200).send({status: "Activity deleted"});
    }).catch((errr) => {
        console.log(errr.message);
        res.status(500).send({status: "Error with delete user", error: errr.message});
    })

}) 


/*
//delete function

  router.route("/get/:id").get(async (req, res) => {
     let activityId = req.params.id;
     const user = await Activity.findById(activityId)
     .then(() => {
         res.status(200).send({status: "User fetched"});
     }).catch(() => {
         console.log(err.message);
         res.status(500).send({status: "Error with get user", error: err.message});
     })
     }) */


//export the module     
module.exports = router;

