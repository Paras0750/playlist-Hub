import ApiError from "../../utils/ApiError";

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  

  if (!username || !email || !password) {
    return ApiError(400, "Username, email, and password are required");
  }



  const isExists = await User.findOne({
    $or : [{
        email : email
    },
    {
        username : username
    }]
  })
    if(isExists){   
        return ApiError(400, "User with this email or username already exists");
    }

    const hasedPassword = await  bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password : hasedPassword
    })

return ApiResponse(res, 201, "User registered successfully", {
    id : user._id,
    username : user.username,
    email : user.email      
        
})
}

export default registerController;