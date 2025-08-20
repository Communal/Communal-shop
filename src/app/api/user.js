/**
 * Get a user by ID or email from the API route
 * @param {Object} params - search parameters
 * @param {string|number} [params.id] - user ID (string or number)
 * @param {string} [params.email] - user email
 * @returns {Promise<Object|null>} - user document or null
 */
export async function getUser({ id, email }) {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, email }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.user || null;
}