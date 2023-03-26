import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

type PhotosAndVideosProps = {
	images: Array<string>;
	videos: Array<string>;
};

export default function PhotosAndVideos({
	images,
	videos,
}: PhotosAndVideosProps) {
	return (
		<>
			<ImageList
				sx={{ maxWidth: 900, maxHeight: 450 }}
				cols={6}
				rowHeight={100}
			>
				{images?.map((item) => (
					<ImageListItem key={item} sx={{ width: '150px' }}>
						<img
							src={`${item}`}
							srcSet={`${item}`}
							loading='lazy'
							style={{ height: '100%' }}
						/>
					</ImageListItem>
				))}
			</ImageList>

			<ImageList
				sx={{ maxWidth: 900, maxHeight: 450 }}
				cols={6}
				rowHeight={100}
			>
				{videos?.map((item) => (
					<ImageListItem key={item} sx={{ width: '150px' }}>
						<video controls src={`${item}`} style={{ maxHeight: '100%' }} />
					</ImageListItem>
				))}
			</ImageList>
		</>
	);
}
