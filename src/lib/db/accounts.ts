import { pool } from './index';

export interface Account {
  id: number;
  user_id: number;
  account_number: string;
  account_type: string;
  balance: number;
  created_at: Date;
}

export interface CreateAccountInput {
  user_id: number;
  account_number: string;
  account_type: string;
  balance?: number;
}

export interface UpdateAccountInput {
  account_type?: string;
  balance?: number;
}

// Create a new account
export async function createAccount(input: CreateAccountInput): Promise<Account> {
  const { rows } = await pool.query(
    `INSERT INTO accounts (user_id, account_number, account_type, balance)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [input.user_id, input.account_number, input.account_type, input.balance ?? 0.0]
  );
  return rows[0];
}

// Get an account by ID
export async function getAccountById(id: number): Promise<Account | null> {
  const { rows } = await pool.query(
    'SELECT * FROM accounts WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

// Get accounts by user ID
export async function getAccountsByUserId(userId: number): Promise<Account[]> {
  const { rows } = await pool.query(
    'SELECT * FROM accounts WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}

// Update an account
export async function updateAccount(id: number, input: UpdateAccountInput): Promise<Account | null> {
  const setClause = Object.entries(input)
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(', ');

  const values = Object.values(input);

  const { rows } = await pool.query(
    `UPDATE accounts 
     SET ${setClause}
     WHERE id = $1 
     RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
}

// Delete an account
export async function deleteAccount(id: number): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM accounts WHERE id = $1',
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}

// Update account balance
export async function updateAccountBalance(id: number, amount: number): Promise<Account | null> {
  const { rows } = await pool.query(
    `UPDATE accounts 
     SET balance = balance + $2
     WHERE id = $1 
     RETURNING *`,
    [id, amount]
  );
  return rows[0] || null;
} 