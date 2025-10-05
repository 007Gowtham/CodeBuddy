import express from 'express';
import { 
    createRoomTopicController,
    getAllRoomTopicController,
    getRoomTopicController,
    getRoomTopicsByRoomController,
    deleteRoomTopicController
} from '../controllers/roomTopicController.js';

const roomTopicRouter = express.Router();

// RoomTopic routes
roomTopicRouter.post('/', createRoomTopicController);
roomTopicRouter.get('/', getAllRoomTopicController);
roomTopicRouter.get('/:id', getRoomTopicController);
roomTopicRouter.get('/room/:roomId', getRoomTopicsByRoomController);
roomTopicRouter.delete('/:id', deleteRoomTopicController);

export default roomTopicRouter;
