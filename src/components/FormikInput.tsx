import { Stack, TextField, InputLabel, FormControl } from '@mui/material'
import { useFormikContext } from 'formik'

interface IProps {
	label?: string
	field: string
	type?: string
	InputProps?: any
	required?: boolean
	readOnly?: boolean
}

const FormikInput = ({ label, field, type = 'text', InputProps = {}, required = false, readOnly = false, ...props }: IProps) => {
	const { getFieldMeta, getFieldProps } = useFormikContext()

	const fieldProps = getFieldProps(field)
	const meta = getFieldMeta(field)

	return (
		<Stack spacing={0.2}>
			{label && (
				<InputLabel sx={{ fontSize: '14px' }} required={required}>
					{label}
				</InputLabel>
			)}
			<FormControl fullWidth>
				<TextField
					{...props}
					type={type}
					size='small'
					{...fieldProps}
					value={fieldProps.value || ''}
					onWheel={e => e.target.blur()}
					InputProps={{ ...InputProps, readOnly, style: { fontSize: '13px' } }}
					error={Boolean(meta.touched && meta.error)}
					helperText={Boolean(meta.touched && meta.error) && meta.error}
				/>
			</FormControl>
		</Stack>
	)
}

export default FormikInput
