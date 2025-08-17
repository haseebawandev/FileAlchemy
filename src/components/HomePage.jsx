import React from 'react';
import { conversionCategories, getConversionsByCategory } from '../data/conversions';
import { useApp } from '../contexts/AppContext';
import { useConversion } from '../hooks/useConversion';
import Card from './ui/Card';
import Button from './ui/Button';
import AuthBenefits from './ui/AuthBenefits';

const HomePage = ({ onCategorySelect, onNavigate }) => {
  const { dispatch, actions } = useApp();
  const { resetConversion } = useConversion();

  const handleCategoryClick = (categoryKey) => {
    resetConversion();
    dispatch({
      type: actions.SET_CONVERSION,
      payload: { 
        category: categoryKey,
        sourceFormat: null,
        targetFormat: null
      }
    });
    onCategorySelect(categoryKey);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
              Transform Your Files
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Instantly</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Convert between dozens of file formats with our powerful, easy-to-use tool. 
            No registration required, completely secure, and lightning fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => document.getElementById('conversions').scrollIntoView({ behavior: 'smooth' })}>
              Start Converting
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('formats')}>
              View All Formats
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">File Formats</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Client-Side</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">⚡</div>
              <div className="text-gray-600 dark:text-gray-400">Lightning Fast</div>
            </div>
          </div>

          {/* Auth Benefits */}
          <div className="mt-12 max-w-2xl mx-auto">
            <AuthBenefits onSignInClick={() => onNavigate('auth')} />
          </div>
        </div>
      </section>

      {/* Conversion Categories */}
      <section id="conversions" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Conversion Type
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select from our comprehensive range of conversion tools, each optimized for different file types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(conversionCategories).map(([key, category]) => (
              <CategoryCard 
                key={key}
                categoryKey={key}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Text-to-Speech Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Text to Speech
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Convert your text into natural-sounding speech with our advanced text-to-speech engine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate('tts')}
                className="bg-green-600 hover:bg-green-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V1" />
                </svg>
                Try Text to Speech
              </Button>
            </div>

            {/* TTS Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Voices</h3>
                <p className="text-gray-600 dark:text-gray-400">Choose from various voice options with different accents and styles</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
                <p className="text-gray-600 dark:text-gray-400">Adjust speech rate, volume, and voice settings to your preference</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download Audio</h3>
                <p className="text-gray-600 dark:text-gray-400">Save your generated speech as high-quality audio files</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose FileAlchemy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🔒"
              title="Secure & Private"
              description="All conversions happen in your browser. Your files never leave your device."
            />
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Optimized algorithms ensure quick conversions even for large files."
            />
            <FeatureCard
              icon="🎯"
              title="High Quality"
              description="Advanced conversion techniques preserve quality and metadata."
            />
            <FeatureCard
              icon="📱"
              title="Mobile Friendly"
              description="Works perfectly on all devices - desktop, tablet, and mobile."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ categoryKey, category, onClick }) => {
  const conversions = getConversionsByCategory(categoryKey);
  
  return (
    <Card 
      onClick={() => onClick(categoryKey)}
      className="p-6 h-full cursor-pointer group"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <span className="text-2xl">{category.icon}</span>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {category.name}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {category.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {category.formats.slice(0, 4).map(format => (
          <span 
            key={format}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg"
          >
            {format}
          </span>
        ))}
        {category.formats.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg">
            +{category.formats.length - 4}
          </span>
        )}
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {conversions.length} conversions available
      </div>
    </Card>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default HomePage;
