import React from 'react';
import Add from '../../constants/Add.json';
const Adv=()=>{
    console.log(Add);
    return(
        <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {Add.AdvTitle}
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {Add.AdvSubtitle}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {Add.AdvInfo}
          </p>
        </div>
      </section>
    );
}
export default Adv;