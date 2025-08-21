import React, { useState, useEffect, useRef, forwardRef } from 'react';
import StarRating from './StarRating';
import ScrollReveal from '../animation/ScrollReveal';

const SkillsSection = forwardRef(({
  title = "Technical Skills",
  subtitle = "A comprehensive overview of my development expertise across various technologies and frameworks",
  summaryTitle = "Constantly Learning & Evolving",
  summaryText = "I'm passionate about staying current with emerging technologies and best practices in web development. Always excited to take on new challenges and expand my skill set!",
  skillsData = null
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const categoryRefs = useRef([]);

  // Default skills data
  const defaultSkillsData = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML5", rating: 5, level: "Expert" },
        { name: "CSS3", rating: 5, level: "Expert" },
        { name: "JavaScript", rating: 4, level: "Advanced" },
        { name: "React.js", rating: 4, level: "Advanced" },
        { name: "Tailwind", rating: 4, level: "Advanced" },
        { name: "TypeScript", rating: 3, level: "Intermediate" },
        { name: "PhotoShop", rating: 2, level: "Beginner" }

      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Python", rating: 4, level: "Advanced" },
        { name: "Express.js", rating: 4, level: "Advanced" },
        { name: "Node.js", rating: 3, level: "Intermediate" },
        { name: "PHP", rating: 3, level: "Intermediate" },
        { name: "RESTful APIs", rating: 3, level: "Intermediate" }
      ]
    },
    {
      category: "",
      skills: [
        { name: "MySQL", rating: 4, level: "Advanced" },
        { name: "R", rating: 3, level: "Intermediate" },
        { name: "Tableau", rating: 3, level: "Intermediate" },
        { name: "Vercel", rating: 3, level: "Intermediate" },
        { name: "AWS", rating: 2, level: "Beginner" }
      ]
    },
    {
      category: "",
      skills: [
        { name: "Git & GitHub", rating: 4, level: "Advanced" },
        { name: "Bash", rating: 3, level: "Intermediate" },
        { name: "VS Code", rating: 4, level: "Advanced" }
      ]
    }
  ];

  const skills = skillsData || defaultSkillsData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = categoryRefs.current.indexOf(entry.target);
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    categoryRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);



  const SkillItem = ({ skill }) => (
    <div className="flex justify-between items-center mb-2 py-3 w-full overflow-hidden">
      <span className="text-gray-700 xl:!text-2xl lg:!text-xl md:!text-lg sm:!text-md text-md font-medium a6 flex-shrink-0 mr-2">
        {skill.name}
      </span>
      <div className="flex flex-row items-center justify-end flex-shrink-0 min-w-0">
        <StarRating rating={skill.rating} skillName={skill.name} />
        <span className=" lg:!text-lg md:!text-base sm:!text-sm text-xs text-gray-500 ml-1 sm:ml-2 a3 font-medium whitespace-nowrap">
          {skill.level}
        </span>
      </div>
    </div>
  );

  const SkillCategory = ({ categoryData, index }) => (
    <div
      ref={el => categoryRefs.current[index] = el}
      className="bg-none rounded-2xl lg:p-8 p-0  "
    >
      <h3 className="sm:text-xl text-md font-semibold text-gray-800 text-center c3 relative">
        {categoryData.category}
      </h3>
      {categoryData.skills.map((skill, skillIndex) => (
        <SkillItem key={skillIndex} skill={skill} />
      ))}
    </div>
  );

  return (
    <div className="font-sans bg-none p-10 md:p-5 min-h-[140vh]">
      <div
        id="skillRef"
        ref={ref}
        className={`min-w-[70vw] w-[85vw] h-auto place-self-center grid  grid-cols-1 grid-rows-auto lg:gap-10 gap-8 pb-0 bg-none  content-start
        grid-cols-[repeat] min-h-screen  h-auto grid-rows-[90px_auto] mt-10 `}>
        <div className='col-span-full row-span-1 mt-4 ' >
          <ScrollReveal delay={.2} triggerOnce={true} duration={1.5} direction='up'>
            <div className='bg-linear-to-br from-gray-500 to-slate-500  justify-self-center
                lg:h-16 lg:w-80 md:h-13 md:w-60 xs:h-11 xs:w-50 xs:max-w-[60%] h-1/2 max-w-[60%]'>
              <p className='text-neutral-700 py-1 sm:ml-7 a6 sm:pt-2 weight-500 lg:text-8xl lg:w-80 md:text-7xl md:w-60 sm:text-6xl xs:w-[110%] xs:text-[9cqw] w-[110%] text-[8cqw] ml-3'>
                Skills
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 grid-rows-auto pt-10">

          <div className="row-span-1 col-span-1 grid grid-rows-[90px_1fr_1fr] grid-cols-1 space-y-10 ">
            <div className='relative flex flex-col justify-center items-center h-20'>
              <h1 className='text-center a6 md:!text-5xl xs:!text-4xl text-2xl'>Web Development</h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
            </div>

            {skills.slice(0, 2).map((categoryData, index) => (
              <div key={index} className='relative h-full row-span-1 col-span-1'>
                <SkillCategory
                  key={index}
                  categoryData={categoryData}
                  index={index}
                />
              </div>
            ))}
          </div>
          <div className="row-span-1 col-span-1 flex flex-col justify-start space-y-20 pt-15">
            <div className='space-y-10'>
              <div className='relative flex flex-col justify-center items-center h-20'>
                <h1 className='text-center a6 md:!text-5xl xs:!text-4xl text-2xl'>Database & Cloud</h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
              </div>
              {skills.slice(2, 3).map((categoryData, index) => (
                <SkillCategory
                  key={index}
                  categoryData={categoryData}
                  index={index}
                />
              ))}
            </div>
            <div className='space-y-10'>
              <div className='relative flex flex-col justify-center items-center h-20'>
                <h1 className='text-center a6 md:!text-5xl xs:!text-4xl text-2xl'>Tools & Workflow</h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
              </div>
              {skills.slice(3, 5).map((categoryData, index) => (
                <SkillCategory
                  key={index}
                  categoryData={categoryData}
                  index={index}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
});

export default SkillsSection;