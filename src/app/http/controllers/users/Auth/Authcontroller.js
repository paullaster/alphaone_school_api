class AuthController {

   login(req, res) {

   };
   signup(req, res) {
    console.log(req.body)
    res.send(req.body)
   }
};

export default new AuthController;