import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const scrollTexts = [
    {
      title: "Connect with Alumni",
      description: "Build meaningful connections with successful alumni from your branch and get career guidance."
    },
    {
      title: "Mentor Students", 
      description: "Share your experience and help current students navigate their academic and career journey."
    },
    {
      title: "Manage Your Branch",
      description: "Admin tools to manage students and alumni, track engagement, and foster community growth."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Change text based on scroll after video is full width (400px+)
      if (currentScrollY > 400) {
        const textScrollStart = 400;
        const textScrollRange = 300; // 300px per text
        const relativeScroll = currentScrollY - textScrollStart;
        const newIndex = Math.min(Math.floor(relativeScroll / textScrollRange), scrollTexts.length - 1);
        setCurrentTextIndex(newIndex);
      } else {
        setCurrentTextIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTexts.length]);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Network Building",
      description: "Connect with peers and alumni across different batches and branches."
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Mentorship",
      description: "Get guidance from experienced alumni or mentor current students."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Knowledge Sharing",
      description: "Share resources, experiences, and insights within your community."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Access job opportunities, internships, and career development resources."
    }
  ];

  // Calculate video container styles based on scroll
  const getVideoContainerStyles = () => {
    const maxScroll = 350; // Maximum scroll distance for full expansion
    const progress = Math.min(scrollY / maxScroll, 1);
    
    // Initial container properties - smaller width that expands on scroll
    const initialWidth = 95; // Start with 90vw
    const initialHeight = 83; // Start with 70vh
    const initialRadius = 24; 
    const initialMargin = 0; 
    
    // Interpolate values to final state (100vw width, 100vh height, 0 radius, 0 margin)
    const width = initialWidth + (100 - initialWidth) * progress; // 90vw -> 100vw
    const height = initialHeight + (100 - initialHeight) * progress; // 70vh -> 100vh
    const borderRadius = initialRadius * (1 - progress);
    const marginTop = initialMargin * (1 - progress);
    
    return {
      width: `${width}vw`, // Use viewport width for true full screen
      height: `${height}vh`, // Use viewport height for true full screen
      borderRadius: `${borderRadius}px`,
      marginTop: `${marginTop}px`,
      transition: scrollY === 0 ? 'all 0.3s ease-out' : 'none'
    };
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section with Video Container */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Black background with blue glow effects - matching NewSignupPage */}
        <div className="absolute inset-0 bg-black">
          {/* Animated particle circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/6 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-10 right-10 w-48 h-48 bg-blue-300/4 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-blue-500/7 rounded-full blur-2xl animate-pulse delay-300"></div>
          
          {/* Subtle radial glow in center */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent"></div>
        </div>

        {/* Content positioned in middle between navbar and video */}
        <div className="relative z-10 text-center px-4 pt-32">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Bridge the Gap
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            Connect students and alumni in a seamless networking platform
          </p>
        </div>

        {/* Video Container with Smooth Expansion to Full Screen */}
        <div className="relative z-10 flex justify-center px-4">
          <div 
            className="relative overflow-hidden border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20"
            style={getVideoContainerStyles()}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            
            {/* Video Overlay Content - Changes based on scroll */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex items-center justify-center">
              <div className="text-center text-white px-8">
                <div 
                  className="transition-all duration-1000 ease-out"
                  style={{
                    transform: `translateY(${(currentTextIndex) * -100}px)`,
                    opacity: scrollY > 1300 ? 0 : 1 // Fade out when approaching website content
                  }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    {scrollTexts[currentTextIndex].title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    {scrollTexts[currentTextIndex].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Appears after video expansion */}
      <section 
        className={`py-20 transition-all duration-1000 ${
          scrollY > 600 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20'
        }`}
        style={{ 
          marginTop: scrollY > 500 ? '0' : '100vh',
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose BridgeLink?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive platform designed to bridge the gap between students and alumni, 
              fostering meaningful connections and professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white/3 backdrop-blur-xl border border-gray-400/25 rounded-3xl p-10 shadow-2xl hover:bg-white/8 transition-all duration-500 text-center group hover:scale-105 hover:bg-white/10 ${
                  scrollY > 700 + index * 100
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="text-primary-500 mb-6 flex justify-center group-hover:text-primary-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Appears after features */}
      <section 
        className={`py-20 bg-gradient-to-r from-primary-600 to-primary-700 transition-all duration-1000 ${
          scrollY > 1200 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students and alumni who are already building their professional networks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup?role=student"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-gray-400/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:border-gray-300/50 text-center"
            >
              Join as Student
            </Link>
            <Link
              to="/signup?role=alumni"
              className="bg-white/5 backdrop-blur-md hover:bg-white/15 text-white font-semibold py-3 px-6 rounded-xl border border-gray-400/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-300/40 text-center"
            >
              Join as Alumni
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;