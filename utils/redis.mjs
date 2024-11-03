import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        // Display any error on the console
        this.client.on('error', (error) => console.error('Redis Client Error:', error));

        // Connect to Redis
        this.client.connect().catch(console.error);
    }

    /**
     * Check if Redis client is alive
     * @returns {boolean} true if connected, otherwise false
     */
    isAlive() {
        return this.client.isReady;
    }

    /**
     * Get value for a given key from Redis
     * @param {string} key - The key to retrieve
     * @returns {Promise<string|null>} The value or null if key doesn't exist
     */
    async get(key) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error('Error getting key from Redis:', error);
            return null;
        }
    }

    /**
     * Set value for a given key with expiration
     * @param {string} key - The key to set
     * @param {string} value - The value to store
     * @param {number} duration - Duration in seconds for the key to expire
     */
    async set(key, value, duration) {
        try {
            await this.client.setEx(key, duration, value);
        } catch (error) {
            console.error('Error setting key in Redis:', error);
        }
    }

    /**
     * Delete a key from Redis
     * @param {string} key - The key to delete
     */
    async del(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Error deleting key from Redis:', error);
        }
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
