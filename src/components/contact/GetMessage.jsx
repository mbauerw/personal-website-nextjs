import { useState } from 'react';
import { GiAntibody, GiAnts } from "react-icons/gi";

const GetMessage = ({fontStyle="text-black", bgStyle="bg-none"}) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Somein bad happun');
      }
      setResponse(data);
      console.log('Success asdfasdfasdfsdfasdf:', data);
      
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // styles
  const inputStyle = "w-full px-4 py-3 bg-neutral-100 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-gray-500 focus:ring-3 focus:ring-gray-100 transition-all duration-200"

  return(
     <div className={`p-5 rounded-2xl bg-none ${bgStyle} `}>
      <h3 className={`text-2xl font-semibold mb-6 text-black ${fontStyle}`}>
        Send Me a Message
      </h3>
      
      <form onSubmit={handleSubmit}>
        {/* First Name & Last Name Row */}
        <div id="names" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className={`block mb-2 font-medium text-gray-700 ${fontStyle}`}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={`block mb-2 font-medium text-gray-700 ${fontStyle}`}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={inputStyle}            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className={`block mb-2 font-medium text-gray-700 ${fontStyle}`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={inputStyle}            />
        </div>

        {/* Subject */}
        <div className="mb-6">
          <label htmlFor="subject" className={`block mb-2 font-medium text-gray-700 ${fontStyle}`}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className={inputStyle}          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className={`block mb-2 font-medium text-gray-700 ${fontStyle}`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project or how I can help you..."
            required
            className={inputStyle}           
            />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-gray-600 to-slate-600 text-white border-none py-4 px-8 rounded-lg text-base font-semibold cursor-pointer transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
     </div>
  )
}

export default GetMessage;
