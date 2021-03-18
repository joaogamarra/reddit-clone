import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import React from 'react'

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
						<Box key={p.id} p={5} shadow='md' borderWidth='1px'>
							<Heading fontSize='xl'>{p.title}</Heading>
							<Text mt={4}>{desc}</Text>
						</Box>
					))}
				</Stack>
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
