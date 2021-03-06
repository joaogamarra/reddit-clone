import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Link } from '@chakra-ui/core'
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
			<br />
			{!data ? <div>loading...</div> : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
