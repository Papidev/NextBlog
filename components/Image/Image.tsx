import React from 'react';

const imagesLib = require('lib/images');
const constants = require('lib/constants');

interface IImage {
	section: string;
	imgName: string;
	description: string;
	mobileImgName?: string;
	alternativeImgName?: string;
}

const Image = ({ section, imgName, description, mobileImgName }: IImage) => {
	const srcSet = imagesLib.getImgSrcset(section, imgName, constants.imgSizes);
	const srcSet_Webp = imagesLib.getImgSrcset(
		section,
		imgName,
		constants.imgSizes,
		'webp'
	);

	let mobileSrcSet = '';
	let mobileSrcSet_Webp = '';
	if (mobileImgName) {
		mobileSrcSet = imagesLib.getImgSrcset(
			section,
			mobileImgName,
			constants.imgSizes
		);
		mobileSrcSet_Webp = imagesLib.getImgSrcset(
			section,
			mobileImgName,
			constants.imgSizes,
			'webp'
		);
	}

	let img = (
		<img
			src={`${imgName}.jpg`}
			alt={`${description}`}
			srcSet={srcSet}
			sizes='100vw'
			className='w-full h-auto max-h-80 object-contain'
		></img>
	);
	let defaultSources = <source srcSet={srcSet_Webp} type='image/webp' />;
	return (
		<div>
			<picture>
				{mobileSrcSet && (
					<>
						<source
							srcSet={mobileSrcSet_Webp}
							type='image/webp'
							media='(max-width: 600px)'
						/>
						<source
							srcSet={mobileSrcSet}
							media='(max-width: 600px)'
						/>
					</>
				)}
				{defaultSources}
				{img}
			</picture>
		</div>
	);
};

export default Image;
