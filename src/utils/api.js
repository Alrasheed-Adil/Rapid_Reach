import axios from "axios";

// Base API URL
const BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL; // Update this with your backend URL
const AI_API_URL = process.env.REACT_APP_AI_API_BASE_URL; // OpenAI API endpoint
const AI_API_KEY = process.env.REACT_APP_AI_API_KEY; // Replace with your actual OpenAI API Key

// Generic GET request
export const getRequest = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}${url}`,{headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },});
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Generic POST request
export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const postRequestSmtp = async (url, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Generic PUT request
export const putRequest = async (url, data) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.put(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Generic DELETE request
export const deleteRequest = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}${url}`, {headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    }},);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// OpenAI API call for email generation
export const generateEmailWithAI = async (prompt) => {
  try {
    console.log("Sending request to OpenAI with prompt:", prompt);

    const response = await axios.post(
      AI_API_URL,
      {
        "model": "command-r-plus-08-2024",
        "messages": [
          {
            "role": "user",
            "content": "in  Write a professional email about " + prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("OpenAI response:", response.data);
    return response.data.message.content[0].text; // Return the generated email content
  } catch (error) {
    console.error("Error generating email with OpenAI:", error);
    throw error.response ? error.response.data : error.message;
  }
};
