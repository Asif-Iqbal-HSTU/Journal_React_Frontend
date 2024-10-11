const Hero = ({
  title = 'Journal System for HSTU',                     // Default title text
  subtitle = 'Journal Related solutions all in one place', // Default subtitle text
  headerTitleTextSize = 'text-4xl',                       // Default title text size
  headerTitleFontStyle = 'font-extrabold',                // Default title font style
  subtitleTextSize = 'text-xl',                           // Default subtitle text size
  subtitleFontStyle = 'font-normal',                      // Default subtitle font style
  paddingY = 'py-20',                                     // Default vertical padding
  backgroundColor = 'bg-indigo-700',                      // Default background color
}) => {
  return (
    <section className={`${backgroundColor} ${paddingY} mb-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1
            className={`${headerTitleTextSize} ${headerTitleFontStyle} text-white sm:text-5xl md:text-6xl`}
          >
            {title}
          </h1>
          <p className={`my-4 ${subtitleTextSize} ${subtitleFontStyle} text-white`}>
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
