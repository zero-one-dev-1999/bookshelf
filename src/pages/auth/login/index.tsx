import { Button, FormControl, Grid } from '@mui/material'
import FormikInput from 'components/FormikInput'
import { Form, Formik, useFormikContext } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const FormComponent: FC = () => {
	const { handleSubmit } = useFormikContext()
	const { t } = useTranslation()

	return (
		<Form
			style={{ padding: '24px' }}
			autoComplete='off'
			onSubmit={e => {
				e.preventDefault()
				handleSubmit(e)
			}}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					e.preventDefault()
				}
			}}
		>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<FormikInput required label={t('name')} field='name' />
				</Grid>
				<Grid item xs={12}>
					<FormikInput required label={t('email')} field='email' />
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<Button color='primary' variant='contained' type='submit' sx={{ mt: 1 }}>
							{t('login')}
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		</Form>
	)
}

const LoginPage: FC = () => {
	return (
		<Formik
			component={FormComponent}
			initialValues={{
				name: '',
				email: '',
			}}
			onSubmit={() => {
				alert(`Ism yoki email xato. Ro'yhatdan o'ting!`)
			}}
			validationSchema={Yup.object({
				name: Yup.string().required(),
				email: Yup.string().required(),
			})}
		/>
	)
}

export default LoginPage
