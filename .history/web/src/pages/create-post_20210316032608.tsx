import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { useCreatePostMutation, useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import Layout from '../components/Layout'
import { useEffect } from 'react'

const CreatePost: React.FC<{}> = ({}) => {
	const [{ data, fetching }] = useMeQuery()
	const router = useRouter()
	useEffect(() => {
		if (!fetching && !data?.me) {
			router.replace('/login')
		}
	}, [fetching, data, router])
	const [, createPost] = useCreatePostMutation()
	return (
		<Layout variant='small'>
			<Formik
				initialValues={{ text: '', title: '' }}
				onSubmit={async (values) => {
					const { error } = await createPost({ input: values })
					if (!error) {
						router.push('/')
					}
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
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient)(CreatePost)
