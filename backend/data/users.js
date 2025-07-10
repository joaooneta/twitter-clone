import bcrypt from "bcryptjs";

const users = [
  {
    name: "João Matheus",
    username: "joaomatheus",
    email: "joao@example.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Estudante de programação.",
  },
  {
    name: "Maria Eduarda",
    username: "mariaeduarda",
    email: "maria@example.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Amante de tecnologia.",
  },
  {
    name: "Carlos Eduardo",
    username: "carlosedu",
    email: "carlos@example.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Frontend dev e café lover.",
  },
  {
    name: "Ana Beatriz",
    username: "anabia",
    email: "ana@example.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Apaixonada por gatos e código.",
  },
];

export default users;
