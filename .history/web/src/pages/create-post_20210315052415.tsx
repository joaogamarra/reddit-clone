import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useCreatePostMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

const CreatePost: React.FC<{}> = ({}) => {
	const router = useRouter()
	const [, createPost] = useCreatePostMutation()
	return (
		<Wrapper>
			<Formik
				initialValues={{ text: '', title: '' }}
				onSubmit={async (values) => {
					await createPost({ input: values })
					router.push('/')
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

export default withUrqlClient(createUrqlClient)(CreatePost)
