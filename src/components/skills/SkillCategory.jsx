import React, { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating';

const SkillItem = ({ skill }) => (
  <div className="flex justify-between items-center mb-4 py-3">
    <span className="text-gray-700 font-medium">{skill.name}</span>
    <div className="flex items-center">
      <StarRating rating={skill.rating} skillName={skill.name} />
      <span className="text-sm text-gray-500 ml-2 font-medium">{skill.level}</span>
    </div>
  </div>
);

const SkillCategory = ({ categoryData, index }) => {
  
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
    ref={el => categoryRefs.current[index] = el}
    className="bg-gray-50 rounded-2xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    style={{
      opacity: isVisible[index] ? 1 : 0,
      transform: isVisible[index] ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    }}
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center relative">
      {categoryData.category}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
    </h3>
    {categoryData.skills.map((skill, skillIndex) => (
      <SkillItem key={skillIndex} skill={skill} />
    ))}
  </div>

  );
}
  

export default SkillCategory;