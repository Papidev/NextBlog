<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { GetStaticPropsContext, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import { ArrayElement } from '@arcath/utils';

import meta from '@/data/meta.json';

import { getPosts, Post } from '@/lib/data/posts';

import { Layout } from 'components/layout';
import { PostDate } from 'components/post-date';
import { OpenGraph } from 'components/open-graph';

export const POST_FIELDS: (keyof Post)[] = [
	'slug',
	'title',
	'href',
	'year',
	'month',
	'day',
	'lead',
];

export const getStaticProps = async ({}: GetStaticPropsContext) => {
	const posts = await getPosts(POST_FIELDS);

	return {
		props: {
			posts,
		},
	};
};

const fetcher = (resource, init) =>
	fetch(resource, init).then(res => res.json());

const PostsBlock: React.FC<{
	i: number;
	initialData?: Pick<Post, ArrayElement<typeof POST_FIELDS>>[];
}> = ({ i, initialData }) => {
	let posts: Pick<Post, ArrayElement<typeof POST_FIELDS>>[];

	if (initialData) {
		posts = initialData;
	} else {
		const { data } = useSWR(`/_data/posts/${i * 5}.json`, fetcher);

		posts = data;

		if (!posts) {
			return <>Loading...</>;
		}
	}

	return (
		<>
			{posts.map(({ title, href, day, month, year, lead }) => {
				return [
					<div key={`${href}-meta`} className='col-start-2'>
						<PostDate year={year} month={month} day={day} />
					</div>,
					<div key={`${href}-data`} className='col-start-3'>
						<h3 style={{ marginTop: '0' }}>
							<Link href={href}>
								<a>{title}</a>
							</Link>
						</h3>
						<p>{lead}</p>
					</div>,
				];
			})}
		</>
	);
};

const PostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	posts,
}) => {
	const [page, setPage] = useState(1);
	const loader = useRef(null);

	const pages = [];
	for (let i = 0; i <= page; i++) {
		pages.push(
			<PostsBlock
				key={i}
				i={i}
				initialData={i === 0 ? posts : undefined}
			/>
		);
	}

	const handleObserver: IntersectionObserverCallback = entities => {
		const target = entities[0];
		if (target.isIntersecting) {
			setPage(page => page + 1);
		}
	};

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '20px',
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(handleObserver, options);
		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<Layout>
			<Head>
				<title>{meta.name} / Posts</title>
			</Head>
			<OpenGraph
				title={`${meta.name} / Posts`}
				description={meta.description}
			/>
			<div className='grid grid-cols-content prose dark:prose-dark max-w-none'>
				<h2 className='col-start-3'>Recent Posts</h2>
				{pages}
				<div className='col-start-3 text-center'>
					<button
						ref={loader}
						onClick={() => {
							setPage(page + 1);
						}}
					>
						Load More
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default PostsPage;
=======
import React, {useState, useEffect, useRef} from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'
import {replaceProperty} from '@arcath/utils/lib/functions/replace-property'
import {pick} from '@arcath/utils/lib/functions/pick'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'

import meta from '~/data/meta.json'

import {getPosts, PostFrontmatter, PostProperties} from '~/lib/data/posts'

import {Layout} from '~/lib/components/layout'
import {PostDate} from '~/lib/components/post-date'
import {OpenGraph} from '~/lib/components/open-graph'

export const POST_FIELDS: (keyof (PostFrontmatter & PostProperties))[] = [
  'slug',
  'title',
  'href',
  'date',
  'lead'
]

export type PostData = {
  title: string
  href: string
  date: string
  lead: string
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const postFiles = await getPosts({limit: false})

  const posts: PostData[] = await asyncMap(postFiles, async post => {
    return replaceProperty(pick(await post.data, POST_FIELDS), 'date', date =>
      date.toISOString()
    )
  })

  return {
    props: {
      posts
    }
  }
}

const PostsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts
}) => {
  return (
    <Layout>
      <Head>
        <title>{meta.name} / Posts</title>
      </Head>
      <OpenGraph
        title={`${meta.name} / Posts`}
        description={meta.description}
      />
      <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
        <h2 className="col-start-3">Recent Posts</h2>
        {posts.map(({title, href, date, lead}) => {
          return [
            <div key={`${href}-meta`} className="col-start-2">
              <PostDate date={date} />
            </div>,
            <div key={`${href}-data`} className="col-start-3">
              <h3 style={{marginTop: '0'}}>
                <Link href={href}>
                  <a>{title}</a>
                </Link>
              </h3>
              <p>{lead}</p>
            </div>
          ]
        })}
      </div>
    </Layout>
  )
}

export default PostsPage
>>>>>>> main
