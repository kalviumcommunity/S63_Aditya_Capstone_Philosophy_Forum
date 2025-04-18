// testFollow.js
const axios = require('axios');

// Test user IDs from our createTestUser.js script - verified existing users
const userId = '6801ec6c87f89a1a9b435be7';      // Test User 1
const targetUserId = '6801ec6c87f89a1a9b435be8'; // Test User 2

// The IDs are already correct, just verifying we're using the right ones
console.log('Using test users:');
console.log('- User 1 ID:', userId);
console.log('- User 2 ID:', targetUserId);

const BASE_URL = 'http://localhost:5000';

// Test follow functionality
async function testFollow() {
  try {
    console.log('Testing follow API...');
    const followResponse = await axios.post(`${BASE_URL}/api/follow/follow`, {
      userId,
      targetUserId
    });
    
    console.log('Follow Response:', followResponse.status, followResponse.data);
    return followResponse.data;
  } catch (error) {
    console.error('Follow Error:', error.response ? error.response.status : 'Network Error');
    console.error('Error Details:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Test unfollow functionality
async function testUnfollow() {
  try {
    console.log('\nTesting unfollow API...');
    const unfollowResponse = await axios.post(`${BASE_URL}/api/follow/unfollow`, {
      userId,
      targetUserId
    });
    
    console.log('Unfollow Response:', unfollowResponse.status, unfollowResponse.data);
    return unfollowResponse.data;
  } catch (error) {
    console.error('Unfollow Error:', error.response ? error.response.status : 'Network Error');
    console.error('Error Details:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Run the tests
async function runTests() {
  try {
    // Test follow
    await testFollow();
    
    // Then test unfollow
    await testUnfollow();
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('\nTest failed to complete.');
  }
}

runTests();