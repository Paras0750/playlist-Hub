import express from "express";


const router = express.Router();

router.post('/register',registerHandler);
router.post('/login',loginHandler);
router.post('/refresh',refreshHandler);
router.post('/logout',logoutHandler);



export default router;