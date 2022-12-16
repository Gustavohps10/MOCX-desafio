import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : { 
    watch : { 
      usePolling : true , 
    }, 
    host : true , // necessário para o mapeamento de portas do Docker Container funcionar 
    strictPort : true , 
    port : 5000 , // você pode substituir esta porta por qualquer porta
   }
})
