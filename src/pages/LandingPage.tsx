import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % videoCarouselData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoCarouselData.length]);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoCarouselData.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videoCarouselData.length) % videoCarouselData.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
      
      {/* Hero Section with Video Carousel */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/50 z-10"></div>
        
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={videoCarouselData[currentVideo].thumbnailUrl}
          >
            <source src={videoCarouselData[currentVideo].videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {videoCarouselData[currentVideo].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {videoCarouselData[currentVideo].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={videoCarouselData[currentVideo].ctaLink}
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  {videoCarouselData[currentVideo].ctaText}
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  Already a member? Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
          <button
            onClick={prevVideo}
            className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlayPause}
            className="p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-full text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={nextVideo}
            className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Video Indicators */}
        <div className="absolute bottom-8 right-8 z-20 flex space-x-2">
          {videoCarouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentVideo ? 'bg-primary-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800">
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
              <div key={index} className="card text-center group hover:scale-105 transition-transform">
                <div className="text-primary-500 mb-4 flex justify-center group-hover:text-primary-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
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
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Join as Student
            </Link>
            <Link
              to="/signup?role=alumni"
              className="bg-primary-800 text-white hover:bg-primary-900 font-medium py-3 px-8 rounded-lg border border-primary-500 transition-colors"
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

