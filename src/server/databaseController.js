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
  name: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
});

const Message = sequelize.define('message', {
  message: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  senderId: { type: Sequelize.INTEGER, allowNull: false },
  roomId: { type: Sequelize.INTEGER, allowNull: false },
});
const Room = sequelize.define('room', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

// 1:M
User.hasMany(Message, { foreignKey: 'senderId' });
Room.hasMany(Message, { foreignKey: 'roomId' });
Room.belongsToMany(User, {
  through: 'user_room_link',
});
User.belongsToMany(Room, {
  through: 'user_room_link',
});
// Room.create({name: 'Main'});

sequelize.sync();

const databaseController = {
  createUser: (req, res) => {
    User.create({ name: req.body.name, password: req.body.password })
      .catch((error) => {
        // console.log('error caught');
        // return res.status(400).send({message: error});
        res.render('../client/register', { usernameTaken: true });
      })
      .then((userInstance, error) => {
        if (error) {
          return res.status(400).send({ message: error });
        }
        Room.findOne({ where: { id: 2 } }).then((roomInstance, error) => {
          if (error) {
            return res.status(400).send({ message: error });
          }
          userInstance.addRoom(roomInstance).then(() => {
            res.cookie('userId', userInstance.id);
            res.cookie('userName', userInstance.name);
            res.cookie('roomId', 2);
            res.cookie('roomName', 'Main');
            res.redirect('/home');
          });
          // console.log(userInstance);
        });
      });
  },

  createMessage: (req, res) => {
    Message.create({
      message: req.body.message,
      senderId: req.cookies.userId,
      roomId: req.cookies.roomId,
    }).then((messageIntance, error) => {
      if (error) {
        return res.status(400).send({ message: error });
      }
      res.redirect('/home');
    });
  },

  getMessages: (req, res) => {
    Message.findAll({
      where: { roomId: req.cookies.roomId },
    }).then((messages, error) => {
      if (error) {
        return res.status(400).send({ message: error });
      }
      const findUserPromises = [];
      // This is bad. I know.
      messages.forEach((message) => {
        findUserPromises.push(User.findOne({ where: { id: message.senderId } }));
      });
      Promise.all(findUserPromises).then((users, error) => {
        users.forEach((user) => {
          messages
            .filter(message => message.senderId === user.id)
            .forEach(message => (message.userName = user.name));
        });
        res.render('../client/home', {
          userName: req.cookies.userName,
          roomName: req.cookies.roomName,
          Messages: messages,
          rooms: res.locals.rooms,
          users: res.locals.users,
        });
      });
    });
  },

  getAllUsers: (req, res) => {
    User.findAll().then((users, error) => {
      if (error) {
        return res.status(400).send({ message: error });
      }
      res.render('../client/createRoom', { Users: users });
    });
  },

  createRoom: (req, res) => {
    Room.create({ name: req.body.name }).then((roomInstance, error) => {
      if (error) {
        return res.status(400).send({ message: error });
      }
      let userArray = [];
      if (typeof req.body.users === 'string') {
        userArray.push(req.body.users);
      } else if (typeof req.body.users !== 'undefined') {
        userArray = req.body.users;
      }
      const findUserPromises = [];
      if (!userArray.includes(req.cookies.userName)) {
        userArray.push(req.cookies.userName);
      }
      userArray.forEach((user) => {
        // console.log('user', user);
        findUserPromises.push(
          User.findOne({
            where: { name: user },
          }),
        );
      });
      Promise.all(findUserPromises).then((users, error) => {
        roomInstance.addUsers(users);
        res.cookie('roomName', roomInstance.name);
        res.cookie('roomId', roomInstance.id);
        res.render('../client/home', {
          userName: req.cookies.userName,
          roomName: roomInstance.name,
          Messages: [],
          rooms: res.locals.rooms,
          users: userArray,
        });
      });
    });
  },

  getRooms: (req, res, next) => {
    Room.findAll({
      include: [
        {
          model: User,
          through: { attributes: ['id'] },
          where: { id: req.cookies.userId },
        },
      ],
    }).then((rooms, error) => {
      res.locals.rooms = rooms;
      next();
    });
  },

  getRoomUsers: (req, res, next) => {
    User.findAll({
      include: [
        {
          model: Room,
          through: { attributes: ['id'] },
          where: { id: req.cookies.roomId },
        },
      ],
    }).then((users, error) => {
      res.locals.users = users;
      next();
    });
  },

  changeRooms: (req, res, next) => {
    Room.findOne({
      where: { id: req.cookies.roomId },
    }).then((roomInstance, error) => {
      if (error) return res.status(400).send({ message: error });

      req.cookies.roomName = roomInstance.name;
      res.cookie('roomName', req.cookies.roomName);
      res.cookie('roomId', req.cookies.roomId);
      next();
    });
  },

  login: (req, res) => {
    User.findOne({ where: { name: req.body.name, password: req.body.password } }).then(
      (userInstance, error) => {
        if (!userInstance) res.render('../client/login', { incorrectCredentials: true });
        else {
          res.cookie('userId', userInstance.id);
          res.cookie('userName', userInstance.name);
          res.cookie('roomId', 2);
          res.cookie('roomName', 'Main');
          res.redirect('/home');
        }
      },
    );
  },
};

module.exports = databaseController;
