import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [allowPageScroll, setAllowPageScroll] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const videoCarouselData = [
    {
      id: 1,
      title: "Connect with Alumni",
      description: "Build meaningful connections with successful alumni from your branch and get career guidance.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl: "https://via.placeholder.com/800x450/1e293b/ffffff?text=Connect+with+Alumni",
      ctaText: "Join as Student",
      ctaLink: "/signup?role=student"
    },
    {
      id: 2,
      title: "Mentor Students",
      description: "Share your experience and help current students navigate their academic and career journey.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://via.placeholder.com/800x450/1e293b/ffffff?text=Mentor+Students",
      ctaText: "Join as Alumni",
      ctaLink: "/signup?role=alumni"
    },
    {
      id: 3,
      title: "Manage Your Branch",
      description: "Admin tools to manage students and alumni, track engagement, and foster community growth.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://via.placeholder.com/800x450/1e293b/ffffff?text=Manage+Your+Branch",
      ctaText: "Admin Access",
      ctaLink: "/login"
    }
  ];

  useEffect(() => {
    let accumulatedDelta = 0;
    const deltaThreshold = 100; // Accumulated threshold for trackpad
    
    const handleScroll = (e: WheelEvent) => {
      if (!allowPageScroll && !isScrolling) {
        e.preventDefault();
        
        const delta = e.deltaY;
        
        // Detect if it's a trackpad (smaller, more frequent deltas) or mouse wheel
        const isTrackpad = Math.abs(delta) < 50;
        
        if (isTrackpad) {
          // Accumulate small trackpad movements
          accumulatedDelta += delta;
          
          if (Math.abs(accumulatedDelta) >= deltaThreshold) {
            setIsScrolling(true);
            
            if (accumulatedDelta > 0 && currentTitle < videoCarouselData.length - 1) {
              // Scroll down - next title
              setCurrentTitle(prev => prev + 1);
            } else if (accumulatedDelta < 0 && currentTitle > 0) {
              // Scroll up - previous title
              setCurrentTitle(prev => prev - 1);
            } else if (accumulatedDelta > 0 && currentTitle === videoCarouselData.length - 1) {
              // Last title reached, allow page scroll
              setAllowPageScroll(true);
            }
            
            // Reset accumulated delta and scrolling flag
            accumulatedDelta = 0;
            setTimeout(() => setIsScrolling(false), 1000);
          }
        } else {
          // Mouse wheel - use original threshold
          const scrollThreshold = 50;
          
          if (Math.abs(delta) > scrollThreshold) {
            setIsScrolling(true);
            
            if (delta > 0 && currentTitle < videoCarouselData.length - 1) {
              // Scroll down - next title
              setCurrentTitle(prev => prev + 1);
            } else if (delta < 0 && currentTitle > 0) {
              // Scroll up - previous title
              setCurrentTitle(prev => prev - 1);
            } else if (delta > 0 && currentTitle === videoCarouselData.length - 1) {
              // Last title reached, allow page scroll
              setAllowPageScroll(true);
            }
            
            // Reset scrolling flag after animation
            setTimeout(() => setIsScrolling(false), 1000);
          }
        }
      }
    };

    const heroSection = document.getElementById('hero-section');
    if (heroSection && !allowPageScroll) {
      heroSection.addEventListener('wheel', handleScroll, { passive: false });
      return () => heroSection.removeEventListener('wheel', handleScroll);
    }
  }, [currentTitle, allowPageScroll, isScrolling, videoCarouselData.length]);

  // Reset scroll behavior when scrolling back up
  useEffect(() => {
    const handlePageScroll = () => {
      if (window.scrollY === 0 && allowPageScroll) {
        setAllowPageScroll(false);
        setCurrentTitle(videoCarouselData.length - 1);
      }
    };

    window.addEventListener('scroll', handlePageScroll);
    return () => window.removeEventListener('scroll', handlePageScroll);
  }, [allowPageScroll, videoCarouselData.length]);

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

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero Section with Scroll-based Title Changes */}
      <section id="hero-section" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/50 z-10"></div>
        
        {/* Single Video Background */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={videoCarouselData[0].thumbnailUrl}
          >
            <source src={videoCarouselData[0].videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Content Overlay with Animated Titles */}
        <div className="relative z-20 h-full flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            {videoCarouselData.map((item, index) => (
              <h1 
                key={index}
                className="text-6xl md:text-8xl font-bold text-white leading-tight text-center absolute w-full transition-all duration-1000 ease-out"
                style={{
                  opacity: index === currentTitle ? 1 : index === currentTitle - 1 || index === currentTitle + 1 ? 0.5 : 0,
                  left: '50%',
                  transform: `translateX(-50%) translateY(${(index - currentTitle) * 120}px)`
                }}
              >
                {item.title}
              </h1>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">
              {currentTitle + 1} / {videoCarouselData.length}
            </span>
            <div className="w-1 h-8 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="w-full bg-white transition-all duration-300"
                style={{ 
                  height: `${((currentTitle + 1) / videoCarouselData.length) * 100}%` 
                }}
              />
            </div>
            {!allowPageScroll && (
              <span className="text-xs mt-2 animate-pulse">
                Scroll to explore
              </span>
            )}
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20">
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
              <div key={index} className="card-frosted text-center group hover:scale-105 transition-all duration-300 hover:bg-white/10">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
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
              className="btn-primary text-center"
            >
              Join as Student
            </Link>
            <Link
              to="/signup?role=alumni"
              className="btn-secondary text-center"
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

