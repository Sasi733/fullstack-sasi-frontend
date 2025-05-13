// Simulated in-memory user database and documents
const users = [];
const documentsByUser = {};

export const mockLogin = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        return reject({
          response: {
            data: {
              errors: [{ msg: 'Invalid email', param: 'email', location: 'body' }],
            },
          },
        });
      }

      if (!credentials.password) {
        return reject({
          response: {
            data: {
              errors: [{ msg: 'Password is required', param: 'password', location: 'body' }],
            },
          },
        });
      }

      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      if (user) {
        const token = `mock-jwt-token-${user.email}`;
        resolve({ message: 'Login successful', token });
      } else {
        reject({ response: { data: { message: 'Invalid credentials' } } });
      }
    }, 500);
  });
};

export const mockRegister = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return reject({
          response: {
            data: {
              errors: [{ msg: 'Invalid email', param: 'email', location: 'body' }],
            },
          },
        });
      }

      // Validate password length
      if (userData.password.length < 6) {
        return reject({
          response: {
            data: {
              errors: [
                {
                  msg: 'Password must be at least 6 characters',
                  param: 'password',
                  location: 'body',
                },
              ],
            },
          },
        });
      }

      // Validate phone format
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(userData.phone)) {
        return reject({
          response: {
            data: {
              errors: [
                { msg: 'Invalid phone number', param: 'phone', location: 'body' },
              ],
            },
          },
        });
      }

      const existingUser = users.find((u) => u.email === userData.email);
      if (existingUser) {
        reject({ response: { data: { message: 'User already exists' } } });
      } else {
        users.push({ email: userData.email, password: userData.password, phone: userData.phone });
        const token = `mock-jwt-token-${userData.email}`;
        resolve({ message: 'Registered successfully', token });
      }
    }, 500);
  });
};

export const mockGetDocuments = async (email, token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate token
      if (!token || !token.startsWith('mock-jwt-token-')) {
        return reject({ response: { data: { message: 'No token provided' } } });
      }

      const user = users.find((u) => u.email === email);
      if (!user) {
        return reject({ response: { data: { message: 'User not found' } } });
      }

      const userDocs = documentsByUser[email] || [];
      resolve({ documents: userDocs });
    }, 500);
  });
};

export const mockUploadDocument = async (formData, token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate token
      if (!token || !token.startsWith('mock-jwt-token-')) {
        return reject({ response: { data: { message: 'No token provided' } } });
      }

      const email = formData.get('email');
      const fileName = formData.get('fileName') || 'New Document.pdf';
      const fileType = formData.get('fileType') || 'pdf';

      // Validate email
      const user = users.find((u) => u.email === email);
      if (!user) {
        return reject({ response: { data: { message: 'User not found' } } });
      }

      // Validate fileName
      if (!fileName) {
        return reject({ response: { data: { message: 'File name is required' } } });
      }

      // Validate fileType
      if (!['pdf', 'certification'].includes(fileType)) {
        return reject({ response: { data: { message: 'Invalid file type' } } });
      }

      // Simulate file upload
      const newDoc = {
        fileName,
        fileUrl: `https://res.cloudinary.com/dqy7bprin/raw/upload/v${Date.now()}/sasi-docs/${fileName}`,
        fileType,
        uploadedAt: new Date().toISOString(),
      };

      if (!documentsByUser[email]) {
        documentsByUser[email] = [];
      }
      documentsByUser[email].unshift(newDoc); // Add to the beginning for newest first

      resolve({ message: 'File uploaded successfully', document: newDoc });
    }, 500);
  });
};