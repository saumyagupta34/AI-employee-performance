const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee');

dotenv.config();

const seedData = [
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    department: 'Development',
    skills: ['React', 'Node.js', 'MongoDB'],
    performanceScore: 92,
    experience: 4,
  },
  {
    name: 'Bob Jones',
    email: 'bob@example.com',
    department: 'HR',
    skills: ['Recruiting', 'Employee Relations'],
    performanceScore: 85,
    experience: 6,
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    department: 'AI/ML',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    performanceScore: 95,
    experience: 3,
  },
  {
    name: 'Diana Prince',
    email: 'diana@example.com',
    department: 'Testing',
    skills: ['Selenium', 'Cypress', 'Jest'],
    performanceScore: 88,
    experience: 5,
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    department: 'Development',
    skills: ['Java', 'Spring Boot', 'SQL'],
    performanceScore: 75,
    experience: 2,
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employee-analytics')
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Employee.deleteMany(); // clear existing
    await Employee.insertMany(seedData);
    console.log('Seed data inserted successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
