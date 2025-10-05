export const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 1000) => {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try { return await fn(); } 
    catch (error) {
      lastError = error;
      if (attempt === maxRetries) break;
      const delay = initialDelay * Math.pow(2, attempt - 1);
      console.log(`⚠️ Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      console.log(`   Error: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
};
