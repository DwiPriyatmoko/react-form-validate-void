import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function App() {
	const registerForm = () => {
		alert('Form submitted');
		// alert(formik.values.password);
	};

	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		onSubmit: registerForm,
		validationSchema: yup.object().shape({
			username: yup.string().required('Username is required').min(3).max(10),
			email: yup.string().required('Email is required').email(),
			password: yup
				.string()
				.required('Password is required')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
					'Password Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character'
				),
		}),
	});

	const handleForm = (event) => {
		const { target } = event;
		formik.setFieldValue(target.name, target.value);
	};

	return (
		<Container py='10'>
			<Heading>Example Form</Heading>
			<Box padding='4' border='1px solid lightgray' borderRadius='4px' mt='8'>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing='3'>
						<FormControl
							isInvalid={formik.errors.username && formik.touched.username}
						>
							<FormLabel>Username</FormLabel>
							<Input onChange={handleForm} name='username' />
							<FormErrorMessage>{formik.errors.username}</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={formik.errors.email && formik.touched.email}
						>
							<FormLabel>Email</FormLabel>
							<Input onChange={handleForm} name='email' />
							<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={formik.errors.password && formik.touched.password}
						>
							<FormLabel>Password</FormLabel>
							<Input onChange={handleForm} name='password' type='password' />
							<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
						</FormControl>
						<Button type='submit' colorScheme='pink'>
							Register Account
						</Button>
					</Stack>
				</form>
			</Box>
		</Container>
	);
}

export default App;
