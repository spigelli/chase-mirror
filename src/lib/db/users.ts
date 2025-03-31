import { pool } from './index';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}

export interface UpdateUserInput {
  email?: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
}

// Create a new user
export async function createUser(input: CreateUserInput): Promise<User> {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, first_name, last_name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [input.email, input.password_hash, input.first_name, input.last_name]
  );
  return rows[0];
}

// Get a user by ID
export async function getUserById(id: number): Promise<User | null> {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

// Get a user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return rows[0] || null;
}

// Update a user
export async function updateUser(id: number, input: UpdateUserInput): Promise<User | null> {
  const setClause = Object.entries(input)
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(', ');

  const values = Object.values(input);

  const { rows } = await pool.query(
    `UPDATE users 
     SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $1 
     RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
}

// Delete a user
export async function deleteUser(id: number): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1',
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}

// List all users
export async function listUsers(): Promise<User[]> {
  const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return rows;
} 