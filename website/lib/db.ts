// lib/db.ts   ← Save exactly this name and location
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const usersFile = path.join(process.cwd(), 'data/users.json');
const progressFile = path.join(process.cwd(), 'data/progress.json');

const readJSON = <T>(file: string, defaultValue: T): T => {
  try {
    if (!fs.existsSync(file)) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2));
      return defaultValue;
    }
    const data = fs.readFileSync(file, 'utf-8');
    return data.trim() ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const writeJSON = <T>(file: string, data: T) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

export const db = {
  users: {
    findByEmail: (email: string) => {
      const users = readJSON(usersFile, []);
      return users.find((u: any) => u.email === email) || null;
    },
    create: (userData: any) => {
      const users = readJSON(usersFile, []);
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      writeJSON(usersFile, users);
      return newUser;
    },
  },
  progress: {
    get: (email: string) => readJSON(progressFile, {})[email] || {},
    update: (email: string, updates: any) => {
      const all = readJSON(progressFile, {});
      all[email] = { ...all[email], ...updates };
      writeJSON(progressFile, all);
    },
  },
  hashPassword: (pass: string) => bcrypt.hashSync(pass, 10),
  comparePassword: (pass: string, hash: string) => bcrypt.compareSync(pass, hash),
};