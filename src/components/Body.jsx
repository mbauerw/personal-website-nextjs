'use client'
import Blank from "./Blank";
import First from "./First";
import Header from "./Header";
import Sections from "./Sections";

function Body() {
   
  return (
    
      <div id="page-content">
        <First id="veryfirst"></First>
        <Blank></Blank>
        <First></First>
        <footer>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
        </footer>
      </div>

  )
}

export default Body;