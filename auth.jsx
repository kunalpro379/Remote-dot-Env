import axios from 'axios';

// ...existing code...

const handleAPIError = (error) => {
    if (error.response) {
        // Server responded with a status other than 200 range
        console.error('API Error:', error.response.data);
    } else if (error.request) {
        // Request was made but no response was received
        console.error('Network Error:', error.message);
        console.error('Request data:', error.request);
    } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
    }
};

// ...existing code...

const verify = async () => {
    try {
        console.log('verifying...');
        const response = await axios.post('https://43claui6j5.execute-api.ap-south-1.amazonaws.com/dev/connectiva/auth/verify', {
            path: '/verify',
            body: {
                username: 'kdkjddkdkdkdkkdkd111',
                code: '511986'
            }
        });
        console.log('Verification response:', response.data);
    } catch (error) {
        handleAPIError(error);
    }
};

// ...existing code...
