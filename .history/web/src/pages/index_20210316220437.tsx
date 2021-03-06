import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Link, Stack } from '@chakra-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'

const Index = () => {
	const [{ data }] = usePostsQuery({
		variables: {
			limit: 10,
		},
	})
	return (
		<Layout>
			<NextLink href='/create-post'>
				<Link>Create Post</Link>
			</NextLink>
			<br />
			{!data ? (
				<div>loading...</div>
			) : (
				<Stack spacing={8}>
					{data.posts.map((p) => (
						<div key={p.id}>{p.title}</div>
					))}
				</Stack>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
