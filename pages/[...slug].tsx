import {GetStaticPropsContext, NextPage, GetStaticPaths, InferGetStaticPropsType} from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

import {getPostBySlug, getPosts} from '../lib/data/posts'

import {Content} from '../lib/components/mdx'
import {Layout} from '../lib/components/layout'

import {prepareMDX} from '../lib/functions/prepare-mdx'

import {POST_FIELDS} from './_data/posts/[skip]'

const {writeFile} = fs.promises

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(params?.slug && Array.isArray(params.slug)){
    const post = await getPostBySlug(params.slug, ['slug', 'title', 'content'])
    const source = await prepareMDX(post.content)

    return {
      props: {
        post,
        source
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(POST_FIELDS, {limit: false})

  const paths = posts.map(({slug}) => {
    return {params: {slug}}
  })

  await writeFile(path.join(process.cwd(), 'pages', '_data', 'posts', 'data.json'), JSON.stringify(posts))

  return {
    paths,
    fallback: false
  }
}

const MDXPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({post, source}) => {
  return <Layout>
    <Head>
      <title>{post.title}</title>
    </Head>
    <Content source={source} heading={post.title} />
  </Layout>
}

export default MDXPage