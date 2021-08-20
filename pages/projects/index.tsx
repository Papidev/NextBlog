<<<<<<< HEAD
import React from 'react';
import { GetStaticPropsContext, NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { groupedBy } from '@arcath/utils';
=======
import React from 'react'
import {GetStaticPropsContext, NextPage, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import {pick} from '@arcath/utils/lib/functions/pick'
import {groupedBy} from '@arcath/utils/lib/functions/grouped-by'
import {asyncMap} from '@arcath/utils/lib/functions/async-map'
>>>>>>> main

import { getProjects } from '@/lib/data/projects';

import { Layout } from 'components/layout';
import { OpenGraph } from 'components/open-graph';

import { pageTitle } from '@/lib/functions/page-title';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
<<<<<<< HEAD
	const projects = await getProjects(['title', 'href', 'lead', 'year'], {
		limit: false,
	});

	return {
		props: {
			projects: groupedBy('year', projects),
		},
	};
};

const BooksPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	projects,
}) => {
	return (
		<Layout>
			<Head>
				<title>{pageTitle('Projects')}</title>
			</Head>
			<OpenGraph title={`Projects`} description={`Projects`} />
			<div className='grid grid-cols-content prose dark:prose-dark max-w-none'>
				{Object.keys(projects).map((year, i) => {
					return [
						<h2 key={i} className='col-start-3'>
							{year}
						</h2>,
						projects[year].map((project, j) => {
							return [
								<h3 key={`h2-${j}`} className='col-start-3'>
									<Link href={project.href}>
										<a>{project.title}</a>
									</Link>
								</h3>,
								<p key={`p-${j}`} className='col-start-3'>
									{project.lead}
								</p>,
							];
						}),
					];
				})}
			</div>
		</Layout>
	);
};

export default BooksPage;
=======
  const projectFiles = await getProjects({
    limit: false
  })

  const projects = await asyncMap(projectFiles, async project => {
    const data = await project.data

    return data
  })

  return {
    props: {
      projects: groupedBy(
        'year',
        projects.map(project =>
          pick(project, ['year', 'href', 'title', 'lead'])
        )
      )
    }
  }
}

const BooksPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projects
}) => {
  return (
    <Layout>
      <Head>
        <title>{pageTitle('Projects')}</title>
      </Head>
      <OpenGraph title={`Projects`} description={`Projects`} />
      <div className="grid grid-cols-content prose dark:prose-dark max-w-none">
        {Object.keys(projects).map((year, i) => {
          return [
            <h2 key={i} className="col-start-3">
              {year}
            </h2>,
            projects[year].map((project, j) => {
              return [
                <h3 key={`h2-${j}`} className="col-start-3">
                  <Link href={project.href}>
                    <a>{project.title}</a>
                  </Link>
                </h3>,
                <p key={`p-${j}`} className="col-start-3">
                  {project.lead}
                </p>
              ]
            })
          ]
        })}
      </div>
    </Layout>
  )
}

export default BooksPage
>>>>>>> main
