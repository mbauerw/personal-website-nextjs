const RandomPhoto = ({height}) => {

  const photos = [
    "src/images/photos/IMG_7383.jpg"
  ]

  const getPhoto = () => {

    const randIndex = Math.floor(Math.random() * photos.length);
    return photos[randIndex];

  }
  return (
    <img src={getPhoto()} className={` `}></img>
  )
  
}

export default RandomPhoto;