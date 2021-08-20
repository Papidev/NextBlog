<<<<<<< HEAD
import React from 'react';
import { GetStaticPropsContext, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { asyncMap, pick } from '@arcath/utils';
=======
import React from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import {pick} from '@arcath/utils/lib/functions/pick'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'
>>>>>>> main

import { getBooks } from '@/lib/data/books';

import { Layout } from 'components/layout';
import { MDX } from 'components/mdx';
import { OpenGraph } from 'components/open-graph';

<<<<<<< HEAD
import { pageTitle } from '@/lib/functions/page-title';
import { prepareMDX } from '@/lib/functions/prepare-mdx';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
	const books = await getBooks(
		['title', 'href', 'cover', 'content', 'link', 'directory', 'slug'],
		{ limit: false }
	);

	const booksWithSource = await asyncMap(books, async book => {
		const source = await prepareMDX(book.content, {
			directory: book.directory,
			imagesUrl: `/img/books/${book.slug.join('/')}/`,
		});

		return pick({ ...book, source }, [
			'title',
			'source',
			'link',
			'href',
			'cover',
		]);
	});

	return {
		props: {
			books: booksWithSource,
		},
	};
};

const BooksPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	books,
}) => {
	return (
		<Layout>
			<Head>
				<title>{pageTitle('Books')}</title>
			</Head>
			<OpenGraph title={`Books`} description={`Books`} />
			<div className='grid grid-cols-content prose dark:prose-dark max-w-none'>
				{books.map(({ title, href, cover, source, link }, i) => {
					return (
						<div
							key={href}
							className='col-start-2 col-end-5 grid grid-cols-3 gap-4'
						>
							{i % 2 === 0 ? (
								<div>
									<Image
										src={cover}
										alt={title}
										width={325}
										height={499}
									/>
								</div>
							) : (
								''
							)}
							<div className='col-span-2'>
								<Link href={href}>
									<h3>{title}</h3>
								</Link>
								<MDX source={source} />
								<p>
									<a href={link}>Buy on Amazon</a>
								</p>
							</div>
							{i % 2 === 0 ? (
								''
							) : (
								<div>
									<Image
										src={cover}
										alt={title}
										width={325}
										height={499}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</Layout>
	);
};

export default BooksPage;
=======
import {pageTitle} from '~/lib/functions/page-title'

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const books = await getBooks({limit: false})

  const booksWithSource = await asyncMap(books, async book => {
    const source = await book.bundle

    return pick({...(await book.data), source}, [
      'title',
      'source',
      'link',
      'href',
      'cover'
    ])
  })

  return {
    props: {
      books: booksWithSource
    }
  }
}

const BooksPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  books
}) => {
  return (
    <Layout>
      <Head>
        <title>{pageTitle('Books')}</title>
      </Head>
      <OpenGraph title={`Books`} description={`Books`} />
      <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
        {books.map(({title, href, cover, source, link}, i) => {
          return (
            <div
              key={href}
              className="col-start-2 col-end-5 grid grid-cols-3 gap-4"
            >
              {i % 2 === 0 ? (
                <div>
                  <Image src={cover} alt={title} width={325} height={499} />
                </div>
              ) : (
                ''
              )}
              <div className="col-span-2">
                <Link href={href}>
                  <h3>{title}</h3>
                </Link>
                <MDX source={source} />
                <p>
                  <a href={link}>Buy on Amazon</a>
                </p>
              </div>
              {i % 2 === 0 ? (
                ''
              ) : (
                <div>
                  <Image src={cover} alt={title} width={325} height={499} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default BooksPage
>>>>>>> main
