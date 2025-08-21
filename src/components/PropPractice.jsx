import { getImageUrl } from "./utils";

const UrlImage =({image, size}) => {
  return (
		<img
			className="h-150 w-320"
			src={getImageUrl(image)}
			alt={image.name}
			// width={size}
			// height={size}
		/>
	);
}

const LocalImage = ({imgId}) => {
	return (
		<img
			className="h-150 w-320"
			src={imgId}
			/>
	)
		
}

export default function Photo({imgId, local}){

	const imageIds = ['edUW7cJ', 'jRetXxS', 'KvSDVHD', 'zs7lXPL', 'rfig4mQ', 'GdLn4KT']

	const randomValue = imageIds[Math.floor(Math.random() * 6)];

  return (
		<div>
			{!local && <UrlImage size={"100%"} image={{ name: 'aPhoto', imageId: imgId }}/>}
			{local && <LocalImage imgId={imgId} /> }
		</div>                  
	)
}