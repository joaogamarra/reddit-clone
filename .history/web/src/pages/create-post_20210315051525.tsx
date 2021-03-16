import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import router from 'next/dist/next-server/lib/router/router'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { toErrorMap } from '../utils/toErrorMap'
import login from './login'

const CreatePost: React.FC<{}> = ({}) => {
	const [] = useCreatePostMutation
	return (
		<Wrapper>
			<Formik
				initialValues={{ text: '', title: '' }}
				onSubmit={async (values) => {
					console.log(values)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField name='title' placeholder='title' label='Title' />
						<Box mt={4}>
							<InputField name='text' placeholder='text...' label='Body' textarea={true} />
						</Box>
						<Button mt={4} type='submit' isLoading={isSubmitting} variantColor='teal'>
							Create Post
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default CreatePost
