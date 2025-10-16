import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AudioProvider } from '@/components/container/AudioProvider'
import { ThemeProvider } from '@/components/container/ThemeProvider'
import { parsedEnv } from '@/env'
import { store } from '@/store'
import getRouter from '@/routes'
import './index.css'

const persistor = persistStore(store)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={parsedEnv.VITE_GG_CLIENT_ID}>
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <AudioProvider>
                        <ThemeProvider>
                            <RouterProvider router={getRouter(parsedEnv.VITE_NODE_ENV)} />
                        </ThemeProvider>
                    </AudioProvider>
                </QueryClientProvider>
            </PersistGate>
            <ToastContainer />
        </ReduxProvider>
    </GoogleOAuthProvider>
)
