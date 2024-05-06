/* eslint-disable prettier/prettier */
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(
	{
		storage,
		version: 5,
		key: 'root',
		whitelist: ['Auth'],
		transforms: [
			encryptTransform({
				secretKey: 'QuYu1N1fZWuN3SFJ99d8l1CKyBFKs2+9VtBEjSWc0URLLcmoGnuF1KW/PHC/xgse',
			}),
		],
	},
	reducers,
)

const store = configureStore({
	reducer: persistedReducer,
	devTools: import.meta.env.DEV,
	middleware: gdm => gdm({ serializableCheck: false }).concat([sagaMiddleware]),
})

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export type RootState = ReturnType<typeof reducers>

export { store, persistor }
