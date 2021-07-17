import React from 'react';
import Image from 'components/Image/Image';

export default function CaptionImage({
	section,
	imgName,
	description,
	alternativeImgName,
}) {
	let caption = (
		<figcaption className='text-blue-900 p-5 pb-2 text-center text-xs'>
			{description}
		</figcaption>
	);
	return (
		<>
			<div className='flex flex-col items-center'>
				<figure className='w-full flex flex-col m0'>
					{/* <a
            href={noBig ? path : imagesLib.getDerivedImgPath(path, "BIG")}
            data-attribute="SRL"
          > */}

					<Image
						section={section}
						imgName={imgName}
						description={description}
						alternativeImgName={alternativeImgName}
					></Image>

					{/* </a> */}
					{caption}
				</figure>
				{/* <p className={styles["img-citation"]}>
          <cite dangerouslySetInnerHTML={createMarkup(children)} />
        </p> */}
			</div>
		</>
	);
}
