import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import React, { useState } from 'react'

const Index = () => {
	const [variables, setVariables] = useState({ limit: 10, cursor: null as null | string })
	const [{ data, fetching }] = usePostsQuery({
		variables,
	})

	console.log(data)

	if (!fetching && !data) {
		return <div>you got no data for some reason</div>
	}

	return (
		<Layout>
			<Flex align='center'>
				<Heading>LiReddit</Heading>
				<NextLink href='/create-post'>
					<Link ml='auto'>Create Post</Link>
				</NextLink>
			</Flex>
			<br />
			{!data && fetching ? (
				<div>loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.posts.map((p) => (
						<Box key={p.id} p={5} shadow='md' borderWidth='1px'>
							<Heading fontSize='xl'>{p.title}</Heading>
							<Text mt={4}>{p.textSnippet}</Text>
						</Box>
					))}
				</Stack>
			)}
			{data && data.posts.hasMore ? (
				<Flex>
					<Button
						onClick={() => {
							setVariables({
								limit: variables.limit,
								cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
							})
						}}
						m='auto'
						isLoading={fetching}
						my={8}
					>
						Load more
					</Button>
				</Flex>
			) : null}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
