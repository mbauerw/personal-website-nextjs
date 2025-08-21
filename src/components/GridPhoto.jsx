
import RandomPhoto from "./RandomPhoto";

const GridPhoto = () => {

  const randomHeight = () => {
    return Math.floor(Math.random() * 150);
  }

  return (
    <div className={`w-full h-full bg-black`}>
      <div className={`w-full h-full flex gap-3 `}>
       {  Array.from({length: 15 }, (_, index) => (
        <RandomPhoto height={randomHeight()} key={index} />
        )) }

      </div>

    </div>

  )
}

export default GridPhoto;