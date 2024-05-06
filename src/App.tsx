import { persistor, store } from 'store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import router from 'routes'
import { setLocale } from 'yup'
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import translationsEN from 'locales/en.json';
import translationsUZ from 'locales/uz.json'

i18n.init({
	interpolation: { escapeValue: false },
	lng: 'uz',
	resources: {
		en: {
			translation: translationsEN,
		},
		uz: {
			translation: translationsUZ,
		},
	},
});

setLocale({
	mixed: {
		required: 'Ushbu maydonni to`ldiring',
	},
})

console.log(import.meta.env.VITE_API_URL);

const App = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<I18nextProvider i18n={i18n}>
					<RouterProvider router={router} />
				</I18nextProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default App
