import Users from "./../models/userModel.js";

export const login = async(req, res)=>{
    try{

        const { email, password} = req.body; 

        let user = await Users.findOne({email: email});
        if(!user){
            return res.status(401).json('User not found');
            }
            
        else if (!await user.matchPassword(password)) {
            return res.status(401).json('Wrong Password')
        }
        else{
            res.status(200).json({
                id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                address:user.address,
                city:user.city,
                country:user.country,
            })
        }
                
    }catch(e){
        res.status(500).json({error: e.message})
    }
}

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json("Error in getting users: ", e);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (e) {
    return res
      .status(404)
      .json({ message: "No user found with the given ID", e });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await Users.create({
      name,
      email,
      password,
      phone,
      address,
    });

    res.status(201).res.json(user);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", e });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await Users.findByIdAndUpdate(id, req.body);

    if (user) {
      res.status(200).json(user);
    }
  } catch (e) {
    return res
      .status(404)
      .json({ message: `No user found with the id ${req.params.id}` }, e);
  }
};
