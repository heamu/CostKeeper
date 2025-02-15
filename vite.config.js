import { defineConfig } from 'vite';  
import react from '@vitejs/plugin-react'; // Uncomment this line  

// https://vite.dev/config/  
export default defineConfig({  
  plugins: [react()], // Ensure this line is also uncommented  
  base:'/CostKeeper/',
  server: {  
    allowedHosts: [  
      '0553-103-119-241-90.ngrok-free.app',
    ],  
  },  
});