import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import TanstackProvider from './tanstack/store/TanstackProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <TanstackProvider>
        <App />
      </TanstackProvider>
    </Provider>
  </StrictMode>,
)
