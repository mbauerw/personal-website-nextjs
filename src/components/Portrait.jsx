import React, {useEffect, useState} from 'react';

function Portrait({
  width = 300, 
  height = 400,
  background = "", 
  image,
  alt = "Portrait",
  className = ""
}) {

  const halo_slate = "bg-linear-to-r from-slate-300 to-slate-400";
  const halo_gray = "bg-linear-to-r from-gray-500 to-gray-400";
  const halo_zinc = "bg-linear-to-r from-zinc-600 to-zinc-500";


  const [offset, setOffset] = useState(0);
  const [shouldIncrement, setShouldIncrement] = useState(true);


  useEffect(() => {
    if(shouldIncrement){
      const interval = setInterval(() => {
        setOffset(prev => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [shouldIncrement]);

  const setSpin = () => setShouldIncrement(prev => !prev);

  return(
    <div className={` rounded-sm lg:h-full h-150 w-full flex flex-col justify-center items-center p-5 ${className}`}>
      <div
        id="portrait"
        className={`flex justify-center outline-2 outline-neutral-950 items-center rounded-full shadow-xl shadow-neutral-600 ${background}`}
        onClick={setSpin}
        style={{
          backgroundPosition: `${offset}px`,
          width: `${width }px`, 
          height: `${height}px`,
          maxHeight: '80%',
          maxWidth: '90%'
        }}     
        >
        <div 
          className={`flex justify-center items-center rounded-full outline-2 outline-neutral-950 h-[55%] w-6/10 ${"bg-[url('/images/portrait_clouds.jpg')]"} bg-cover -mt-4 `}
          
        >
            <img
            src={image}
            alt={alt}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${width-60}px`, 
              height: `${height-180}px`,
              maxHeight: '80%',
              maxWidth: '90%'
            }}
            />  


          </div>
          
      </div>
    </div>
  )
}
export default Portrait;