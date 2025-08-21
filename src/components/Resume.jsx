
const Resume = ({onClick}) => {

  const handleClick = () => {
    console.log("we've been clicked!!!");
  }

  return (
    <div className="relative w-full h-full"> 
      <iframe 
        src="/assets/resume-word-grey-updated.pdf#zoom=95"
        width="100%"
        height="100%"
        title="Resume"
        onClick={handleClick}
      />
      <div 
        onClick={handleClick}
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          width: '95%',
          height: '90%',
          backgroundColor: 'transparent',
          cursor: 'pointer'
        }}
      />
    </div>
  )
}

export default Resume;