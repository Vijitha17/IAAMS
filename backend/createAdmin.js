const { User } = require('./models');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  await User.create({
    name: 'Management Admin',
    email: 'admin@gmail.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'management_admin',
    isActive: true
  });
  console.log('Management admin created!');
};

createAdmin();