import { combineReducers } from 'redux'
import Books from './book/reducer'
import Auth from './auth/reducer'

export default combineReducers({ Books, Auth })
