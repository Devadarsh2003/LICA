// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/LandingPage.css';
// import priceImage from "../assets/price.png"
// import analysisImage from "../assets/analysis.png"
// import aiImage from "../assets/ai.png"
// import rankImage from "../assets/ranking.png"
// import searchImage from "../assets/search.png"
// import topImage from "../assets/top_deals.png"

// const LandingPage = () => {
//     return (
//         <div className="landing-page">
//             <header className="landing-header">
//                 <div className="header-content">
//                     <div className="header-text">
//                         <h1>LICA</h1>
//                         <h2>Find the Best Deals with AI</h2>
//                         <p>LICA helps you discover the best product recommendations and price comparisons across<br/> multiple e-commerce platforms.</p>
//                         <div className="header-buttons">
//                             <Link to="/signup" className="primary-btn">Get Started</Link>
//                             <Link to="/login" className="secondary-btn">Login</Link>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             <section className="features-section">
//                 <h2>Why Choose LICA?</h2>
//                 <div className="features-container">
//                     <div className="feature-item">
//                         <img src={aiImage} alt="AI Recommendations" className="feature-image"/>
//                         <h3>AI-Powered Recommendations</h3>
//                         <p>Get personalized product suggestions based on your needs.</p>
//                     </div>
//                     <div className="feature-item">
//                         <img src={priceImage} alt="Price Comparison" className="feature-image"/>
//                         <h3>Real-Time Price Comparison</h3>
//                         <p>Compare prices across Amazon, Flipkart, and eBay to find the best deal.</p>
//                     </div>
//                     <div className="feature-item">
//                         <img src={topImage} alt="Top Deals" className="feature-image"/>
//                         <h3>Top 10 Best Deals</h3>
//                         <p>See the top 10 options ranked by price and quality.</p>
//                     </div>
//                 </div>
//             </section>

//             <section className="how-it-works">
//                 <h2>How It Works</h2>
//                 <div className="steps-container">
//                     <div className="step-item">
//                         <img src={searchImage} alt="Search Products" />
//                         <h3>Search for a Product</h3>
//                         <p>Enter the product name or category to start your search.</p>
//                     </div>
//                     <div className="step-item">
//                         <img src={analysisImage} alt="Analyze Data" />
//                         <h3>AI Analyzes Data</h3>
//                         <p>Our AI fetches data from multiple sources and provides insights.</p>
//                     </div>
//                     <div className="step-item">
//                         <img src={rankImage} alt="Find Best Deal" />
//                         <h3>Find the Best Deal</h3>
//                         <p>View the top-ranked products and compare prices instantly.</p>
//                     </div>
//                 </div>
//             </section>

//             <footer className="landing-footer">
//                 <p>&copy; 2024 LICA. All rights reserved.</p>
//                 <div className="social-links">
//                     <a href="https://twitter.com" target="_blank" rel="noreferrer">
//                         <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter" />
//                     </a>
//                     <a href="https://facebook.com" target="_blank" rel="noreferrer">
//                         <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" />
//                     </a>
//                     <a href="https://linkedin.com" target="_blank" rel="noreferrer">
//                         <img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="LinkedIn" />
//                     </a>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;





import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';
import priceImage from "../assets/price.png";
import analysisImage from "../assets/analysis.png";
import aiImage from "../assets/ai.png";
import rankImage from "../assets/ranking.png";
import searchImage from "../assets/search.png";
import topImage from "../assets/top_deals.png";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <header className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 bg-blue-50 z-0 opacity-70"></div>
                <div className="blob-1"></div>
                <div className="blob-2"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-4">
                            LICA
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-6">
                            Find the Best Deals with AI
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            LICA helps you discover the best product recommendations and price 
                            comparisons across multiple e-commerce platforms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/signup" className="btn-primary">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn-secondary">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
                        Why Choose LICA?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <img src={aiImage} alt="AI Recommendations" />
                            </div>
                            <h3 className="feature-title">AI-Powered Recommendations</h3>
                            <p className="feature-desc">
                                Get personalized product suggestions based on your needs.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <img src={priceImage} alt="Price Comparison" />
                            </div>
                            <h3 className="feature-title">Real-Time Price Comparison</h3>
                            <p className="feature-desc">
                                Compare prices across Amazon, Flipkart, and eBay to find the best deal.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="icon-wrapper">
                                <img src={topImage} alt="Top Deals" />
                            </div>
                            <h3 className="feature-title">Top 10 Best Deals</h3>
                            <p className="feature-desc">
                                See the top 10 options ranked by price and quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div className="step-icon">
                                <img src={searchImage} alt="Search Products" />
                            </div>
                            <h3 className="step-title">Search for a Product</h3>
                            <p className="step-desc">
                                Enter the product name or category to start your search.
                            </p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div className="step-icon">
                                <img src={analysisImage} alt="Analyze Data" />
                            </div>
                            <h3 className="step-title">AI Analyzes Data</h3>
                            <p className="step-desc">
                                Our AI fetches data from multiple sources and provides insights.
                            </p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div className="step-icon">
                                <img src={rankImage} alt="Find Best Deal" />
                            </div>
                            <h3 className="step-title">Find the Best Deal</h3>
                            <p className="step-desc">
                                View the top-ranked products and compare prices instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-blue-900 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to Find the Best Deals?</h2>
                    <Link to="/signup" className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                        Start Saving Today
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-6 bg-gray-900 text-white">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="mb-4 md:mb-0">&copy; 2024 LICA. All rights reserved.</p>
                        <div className="flex space-x-6">
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                                <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" className="social-icon" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="Facebook" className="social-icon" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
                                <img src="https://img.icons8.com/fluent/30/000000/linkedin.png" alt="LinkedIn" className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;