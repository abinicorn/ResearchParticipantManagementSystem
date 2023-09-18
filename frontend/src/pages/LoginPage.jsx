import React, {useState, useContext, useEffect, useCallback} from "react";
import {
    Box,
    Container,
    CssBaseline,
    Avatar,
    Typography,
    TextField,
    Alert,
    Button,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import {useSignIn} from "../hooks/useSignIn";




const Login = () => {

    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { onSignIn, error, isLoading } = useSignIn();



    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        await onSignIn(
            data.get('username'),
            data.get('password')
        );
    },
        []
    );


        // try {
        //     console.log('Handling submit...');
        //     const username = formData.username;
        //     const password = formData.password;
        //
        //     const response = fetchLogin(username, password);

            // const cookies = response.headers['cookie'];
            //
            // console.log(cookies);
            // 存储Cookie到前端
            // cookies.forEach(cookie => {
            //     document.cookie = cookie;
            // });


            // const userId = response.data.result._id;
            //
            // console.log('Login successful!');
            //
            // navigate('/homepage');


            // if (userId){

                // const userInfo = fetchUserInfo(userId);
                //
                // setCurrentUser(prevData => ({ ...prevData
                //     , userId: userId,
                //     firstName: userInfo.firstName,
                //     lastName: userInfo.lastName,
                //     email: userInfo.email,
                //     studyList: userInfo.studyList, }));


            //     navigate('/homepage');
            //
            //
            // } else {
            //     alert(response.data.message);
            // }

        //
        // } catch (error) {
        //     console.error('Login error:', error);
        //     alert('Login failed. Please check your credentials.');
        // }

    // };


   // const fetchLogin = async (username, password) => {
   //
   //     const response = await axios.post('http://localhost:3001/researcher/login', {
   //         username,
   //         password,
   //     });
   //
   //     return response;
   //
   // }


    // const fetchUserInfo = async (userId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:3001/researcher/info/${userId}`);
    //         const firstName = response.data.result.firstName;
    //         const lastName = response.data.result.lastName;
    //         const email = response.data.result.email;
    //         const studyList = response.data.result.studyList;
    //
    //         const userInfo = {
    //             firstName: firstName,
    //             lastName: lastName,
    //             email: email,
    //             studyList: studyList
    //         };
    //         return userInfo;
    //     } catch (error) {
    //         console.error("Error fetching user info:", error);
    //     }
    // };

    return (
        <Container component="main" maxWidth="xs">
            {error && <Alert severity="error">{error}</Alert>}
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlined />
                </Avatar>

                <Typography component="h1" variant="h5">
                    ResearchFusion
                </Typography>

                <Box
                    component="form"
                    noValidate
                    width={"100%"}
                    sx={{ mt: 1 }}

                    onSubmit={handleSubmit}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        variant="outlined"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading ..." : "Log In"}
                    </Button>


                </Box>
            </Box>
        </Container>
    );
};


export default Login;