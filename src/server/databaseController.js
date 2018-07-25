const Sequelize = require('sequelize');

// create database
// give permissions to elf user

const sequelize = new Sequelize('keebler', 'elf', 'ilikecookies', {
  host: 'localhost',
  dialect: 'postgres',
});

// TEST DB CONNECTION
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
});

const Message = sequelize.define('message', {
  message: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  roomId: { type: Sequelize.INTEGER, allowNull: false },
});

const Room = sequelize.define('room', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

// 1:M
User.hasMany(Message, { foreignKey: 'userId' });
Room.hasMany(Message, { foreignKey: 'roomId' });
Room.belongsToMany(User, { through: 'user_room_link' });
User.belongsToMany(Room, { through: 'user_room_link' });

sequelize.sync();

Room.findOrCreate({ where: { id: 99999, name: 'Main' } });

const databaseController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userInstance = await User.create({ username, password });
      const roomInstance = await Room.findById(1);
      await userInstance.addRoom(roomInstance);
      res.json(userInstance);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Something went wrong' });
    }
  },

  createMessage: async ({
    message, userId, username, roomId,
  }) => {
    try {
      return await Message.create({
        message,
        userId,
        username,
        roomId,
      });
    } catch (error) {
      console.log(error);
      return console.log('problem retrieving messages bro');
    }
  },

  getMessages: async (req, res) => {
    try {
      const messages = await Message.findAll({
        where: { roomId: req.params.roomId },
      });
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: 'error getting messages' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.findAll();
      res.json(allUsers);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  createRoom: async (req, res) => {
    try {
      const { userId, roomname } = req.body;
      const userInstance = await User.findById(userId);
      const roomInstance = await Room.create({ name: roomname });
      await userInstance.addRoom(roomInstance);
      res.json(roomInstance);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'I am an error!' });
    }
  },

  inviteUsers: async (req, res) => {
    try {
      const { roomId } = req.params;
      const { userIds } = req.body;
      const roomInstance = await Room.findById(roomId);
      userIds.forEach(async (userId) => {
        const userInstance = await User.findById(userId);
        await userInstance.addRoom(roomInstance);
      });
      const roomUsers = await User.findAll({
        include: [
          {
            model: Room,
            through: { attributes: ['id'] },
            where: { id: req.body.roomId },
          },
        ],
      });
      res.json(roomUsers);
    } catch (error) {
      res.json({ error: 'problem inviting users' });
    }
  },

  // Find all the rooms a user belongs to
  getRooms: async (req, res) => {
    try {
      const { userId } = req.params;
      const allRooms = await Room.findAll({
        include: [
          {
            model: User,
            through: { attributes: ['id'] },
            where: { id: userId },
          },
        ],
      });
      res.json(allRooms);
    } catch (error) {
      res.status(400).json({ error: 'Problem getting Romoz' });
    }
  },

  // Find all the users in a particular room
  getRoomUsers: async (req, res) => {
    try {
      const { roomId } = req.params;
      const roomUsers = await User.findAll({
        include: [
          {
            model: Room,
            through: { attributes: ['id'] },
            where: { id: roomId },
          },
        ],
      });
      res.json(roomUsers);
    } catch (error) {
      res.status(400).json({ error: 'problem getting room users' });
    }
  },
  // login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userInstance = await User.findOne({ where: { username, password } });
      if (!userInstance) throw new Error();
      res.json(userInstance);
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  },
};

module.exports = databaseController;
