import React from "react";

const Services3 = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-[50rem] bg-no-repeat bg-cover bg-center relative">
      {/* Image Section */}
      <div className="flex-1 relative">
        <img
          src="src/assets/Trainer.jpg"
          alt="Trainer"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text Section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-customGreen bg-opacity-70 rounded-lg shadow-lg">
        <div className="text-black max-w-lg mx-4">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Choose Your Trainer
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam
            culpa id perspiciatis ipsa ullam, mollitia soluta maxime vero
            voluptatem harum facilis inventore, ad minus beatae voluptates cumque
            incidunt architecto necessitatibus quaerat doloremque asperiores quas
            possimus nesciunt molestiae. Iste, nostrum. Vel, veniam. Quo placeat
            doloremque excepturi sunt ratione dolores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services3;
