import User from '../db/User.js';

/**
 * Get a user by ID or email
 * @param {Object} params - search parameters
 * @param {string|number} [params.id] - user ID (string or number)
 * @param {string} [params.email] - user email
 * @returns {Promise<Object|null>} - user document or null
 */
export async function getUser({ id, email }) {
  if (!id && !email) throw new Error('id or email required');

  let query = {};
  if (id !== undefined) {
    query._id = id.toString(); // Mongoose IDs are strings
  } else {
    query.email = email;
  }

  const user = await User.findOne(query).lean(); // `.lean()` returns plain JS object
  return user || null;
}