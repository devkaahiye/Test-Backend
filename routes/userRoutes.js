import express from 'express';
import { createUser, getUserById, getUsers, login, updateUser } from '../controller/usersController.js';

const router = express.Router()

router.route('/').get(getUsers).post(createUser)
router.route('/:id').put(updateUser).get(getUserById)
router.route('/login').post(login)

export default router