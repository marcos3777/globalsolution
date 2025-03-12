/**
 * Utility to reset the local IndexedDB database.
 * Import and call this function to ensure the database is recreated with the latest sample data.
 */

// Database name - should match the one in indexedDB.ts
const DB_NAME = "localTestDB";

export const resetDatabase = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Delete the database if it exists
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

    deleteRequest.onerror = () => {
      console.error("Failed to delete database");
      reject(new Error("Failed to delete database"));
    };

    deleteRequest.onsuccess = () => {
      console.log("Database deleted successfully");
      // The database will be recreated with sample data next time it's accessed
      resolve();
    };
  });
};

/**
 * Usage:
 * 
 * import { resetDatabase } from "@/utils/resetDatabase";
 * 
 * // Call on specific page or component mount
 * useEffect(() => {
 *   resetDatabase()
 *     .then(() => {
 *       console.log("Database reset successfully");
 *       // Trigger data reload if needed
 *     })
 *     .catch(error => {
 *       console.error("Error resetting database:", error);
 *     });
 * }, []);
 */ 