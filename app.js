let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
require("./db");
let jwt = require("jsonwebtoken");
let validate = require("./validate");
const nodemailer = require("nodemailer");
let Service = require("./Models/Service");
let User = require("./Models/User");
let Testimonial = require("./Models/Testimonials");
let Contactus = require("./Models/Contactus");
let Offers = require("./Models/Offers");

let app = express();
let PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post(
  "/sendmail/:username/:email/:service/:phone/:address/:message/:status",
  async (req, res) => {
    let username = req.params.username;
    let email = req.params.email;
    let service = req.params.service;
    let phone = req.params.phone;
    let address = req.params.address;
    let message = req.params.message;
    let status = req.params.status;
    let subject = "";
    let text = "";
    if (status === "process") {
      subject = "Your Service Request is Being Processed";
      text = `Dear ${username},

      We hope this email finds you well.

      We wanted to inform you that we have received your request for ${service} and it is currently being processed. Thank you for reaching out to us!

      Here are the details you provided:
      - Name: ${username}
      - Email: ${email}
      - Phone: ${phone}
      - Address: ${address}
      - Service: ${service}
      - Message: ${message}
    
      Our team is working diligently to address your request and will get back to you as soon as possible with further updates.
      
      If you have any questions or need further assistance, please don't hesitate to reach out to us at mindyourcode0101@gmail.com.
      
      Thank you for choosing our services. We appreciate your patience and understanding.
      
      Best regards,
      E-Farm`;
    } else if (status === "success") {
      subject = "Your Service Request has been completed";
      text = `Dear ${username},

      We hope this email finds you well.
    
      We wanted to inform your request for ${service} has been completed. Thank you for reaching out to us!
      
      Here are the details you provided:
      - Name: ${username}
      - Email: ${email}
      - Phone: ${phone}
      - Address: ${address}
      - Service: ${service}
      - Message: ${message}
      
      Our team is working diligently to address your request and will get back to you as soon as possible with further updates.
      
      If you have any questions or need further assistance, please don't hesitate to reach out to us at mindyourcode0101@gmail.com.
      
      Thank you for choosing our services. We appreciate your patience and understanding.
      
      Best regards,
      E-Farm`;
    }
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mindyourcode0101@gmail.com",
        pass: "nyqx bcun ekyw sucr",
      },
    });
    let mailOptions = {
      from: "mindyourcode0101@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };
    transport.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log("mail send");
    });
    res.end();
  }
);

// GET Methods
app.get("/admindashboard", validate,(req, res)=>{
  res.send("welcome")
})

app.get("/offers", async (req, res) => {
  let result = await Offers.find({});
  res.send(result);
});

app.get("/offers/:id", async (req, res) => {
  let result = await Offers.findById(req.params.id);
  res.send(result);
});

app.get("/services", async (req, res) => {
  let result = await Service.find({});
  res.send(result);
});

app.get("/services/:id", async (req, res) => {
  let result = await Service.findById(req.params.id);
  res.send(result);
});

app.get("/testimonials", async (req, res) => {
  let result = await Testimonial.find({});
  res.send(result);
});

app.get("/testimonials/:id", async (req, res) => {
  let result = await Testimonial.findById(req.params.id);
  res.send(result);
});

app.get("/contactus", async (req, res) => {
  let result = await Contactus.find({});
  res.send(result);
});

app.get("/contactus/:id", async (req, res) => {
  let result = await Contactus.findById(req.params.id);
  res.send(result);
});

app.get("/users", async (req, res) => {
  let result = await User.find({});
  res.send(result);
});

// POST Methods
app.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (email !== "navamajabale05@gmail.com") {
    res.send("Email is not valid!");
  } else if (password !== "Navam@124") {
    res.send("Incorrect Password!");
  } else {
    let payload = {
      user: {
        id: "0987654321",
      },
    };
    jwt.sign(payload, "jwtToken", { expiresIn: 3000 }, (err, token) => {
      if (err) throw err;
      res.send(token);
    });
  }
});

app.post("/offer", async (req, res) => {
  let data = new Offers(req.body);
  let result = await data.save();
  res.send(result);
});

app.get("/admindashboard",validate,async (req, res) => { 
  res.send(`<h1>Admin Dashboard</h1>`);
});

app.post("/testimonial", async (req, res) => {
  let data = new Testimonial(req.body);
  let result = await data.save();
  res.send(result);
});

app.post("/service", async (req, res) => {
  let data = new Service(req.body);
  let result = await data.save();
  res.send(result);
});

app.post("/user", async (req, res) => {
  let data = new User(req.body);
  let result = await data.save();
  res.send(result);
});

app.post("/contactus", async (req, res) => {
  let data = new Contactus(req.body);
  let result = await data.save();
  res.send(result);
});

// PUT Methods
app.put("/offer/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Offers.findByIdAndUpdate(id, {
    title: req.body.title,
    content: req.body.content,
  });
  res.send(result);
});

app.put("/contactus/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Contactus.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    service: req.body.service,
    message: req.body.message,
  });
  res.send(result);
});
app.put("/service/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Service.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  });
  res.send(result);
});
app.put("/testimonial/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Testimonial.findByIdAndUpdate(id, {
    title: req.body.title,
    content: req.body.content,
    name: req.body.name,
  });
  res.send(result);
});

// DELETE Methods
app.delete("/offer/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Offers.findByIdAndDelete(id);
  res.send(result);
});

app.delete("/testimonial/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Testimonial.findByIdAndDelete(id);
  res.send(result);
});

app.delete("/contactus/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Contactus.findByIdAndDelete(id);
  res.send(result);
});

app.delete("/service/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Service.findByIdAndDelete(id);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
