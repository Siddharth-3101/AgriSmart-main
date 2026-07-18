import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import "./sankari.css";
// Clean and simple UI-only state to support frontend layout prototyping
const initialAgriState = {
  user: {
    userId: 101,
    name: 'Siddharth',
    email: 'farmer@agrismart.com',
    role: 'FARMER',
    district: 'Coimbatore',
    state: 'Tamil Nadu'
  },
  demoMode: true,
  farms: [],
  crops: [],
  weather: null,
  schemes: [],
  chatMessages: [
    { sender: 'bot', text: 'Hello! I am your AgriSmart AI Chatbot. How can I assist you with your farming today?', time: 'Just now' }
  ]
};

const agriSlice = createSlice({
  name: 'agri',
  initialState: initialAgriState,
  reducers: {
    setUser: (state, action) => { state.user = action.payload; },
    setDemoMode: (state, action) => { state.demoMode = action.payload; },
    setFarms: (state, action) => { state.farms = action.payload; },
    setCrops: (state, action) => { state.crops = action.payload; },
    setWeather: (state, action) => { state.weather = action.payload; },
    setSchemes: (state, action) => { state.schemes = action.payload; },
    setChatMessages: (state, action) => { state.chatMessages = action.payload; },
    addChatMessage: (state, action) => { state.chatMessages.push(action.payload); },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const {
  setUser,
  setDemoMode,
  setFarms,
  setCrops,
  setWeather,
  setSchemes,
  setChatMessages,
  addChatMessage,
  logout
} = agriSlice.actions;

export const store = configureStore({
  reducer: {
    agri: agriSlice.reducer
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
