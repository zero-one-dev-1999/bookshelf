/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
import { Button, FormControl, Grid } from '@mui/material'
import FormikInput from 'components/FormikInput'
import { Form, Formik, useFormikContext } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authRegisterUserAction } from 'store/actions'
import * as Yup from 'yup'

const FormComponent: FC = () => {
	const { t } = useTranslation()
	const { handleSubmit } = useFormikContext()


	return (
		<Form style={{ padding: '24px' }} autoComplete='off'
			onSubmit={e => {
				e.preventDefault()
				handleSubmit(e)
			}}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					e.preventDefault()
				}
			}}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<FormikInput required label={t('name')} field='name' />
				</Grid>
				<Grid item xs={12}>
					<FormikInput required label={t('email')} field='email' />
				</Grid>
				<Grid item xs={12}>
					<FormikInput required label={t('key')} field='key' />
				</Grid>
				<Grid item xs={12}>
					<FormikInput required label={t('secret')} field='secret' />
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<Button color='primary' variant='contained' type='submit' sx={{ mt: 1 }}>
							{t('registration')}
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		</Form>
	)
}

const RegistrationPage: FC = () => {
	const dispatch = useDispatch()

	return (
		<Formik
			component={FormComponent}
			initialValues={{
				name: '',
				email: '',
				key: '',
				secret: ''
			}}
			onSubmit={values => {
				dispatch(
					authRegisterUserAction(
						values
					),
				)
			}}
			validationSchema={Yup.object({
				name: Yup.string().required(),
				secret: Yup.string().required(),
				key: Yup.string().required(),
				email: Yup.string().required(),
			})}
		/>
	)
}

export default RegistrationPage
