// /* eslint-disable no-unused-vars */
// const API_BASE_URL = 'http://localhost:8080/api';

// export const login = async (username, password) => {
//     // eslint-disable-next-line no-template-curly-in-string
//     const response = await fetch('${API_BASE_URL}/auth/login', {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//         throw new Error("Login failed");
//     }
//     return response.json();
// }