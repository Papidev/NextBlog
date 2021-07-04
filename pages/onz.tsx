import { bundleMDX } from "mdx-bundler";
import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";

function Stronzo({ code, frontmatter }) {
	// it's generally a good idea to memoize this function call to
	// avoid re-creating the component every render.
	const Component = React.useMemo(() => getMDXComponent(code), [code]);
	return (
		<>
			<header>
				<h1>{frontmatter.title}</h1>
				<p>{frontmatter.description}</p>
			</header>
			<main>
				<Component />
			</main>
		</>
	);
}
export default Stronzo;

export const getStaticProps = async ({}) => {
	const mdxSource = `
  ---
  title: Example Post
  published: 2021-02-13
  description: This is some description
  ---
  

  
  import Demo from '../lib/components/Utility/demo.tsx';
  <Demo />;
  
  
  

  `.trim();

	const result = await bundleMDX(mdxSource);

	const { code, frontmatter } = result;

	return {
		props: {
			code,
			frontmatter,
		},
	};
};
