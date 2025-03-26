import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';
import priceImage from "../assets/price.png"
import analysisImage from "../assets/analysis.png"
import aiImage from "../assets/ai.png"
import rankImage from "../assets/ranking.png"
import searchImage from "../assets/search.png"
import topImage from "../assets/top_deals.png"

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="header-content">
                    <div className="header-text">
                        <h1>LICA</h1>
                        <h2>Find the Best Deals with AI</h2>
                        <p>LICA helps you discover the best product recommendations and price comparisons across<br/> multiple e-commerce platforms.</p>
                        <div className="header-buttons">
                            <Link to="/signup" className="primary-btn">Get Started</Link>
                            <Link to="/login" className="secondary-btn">Login</Link>
                        </div>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <h2>Why Choose LICA?</h2>
                <div className="features-container">
                    <div className="feature-item">
                        <img src={aiImage} alt="AI Recommendations" className="feature-image"/>
                        <h3>AI-Powered Recommendations</h3>
                        <p>Get personalized product suggestions based on your needs.</p>
                    </div>
                    <div className="feature-item">
                        <img src={priceImage} alt="Price Comparison" className="feature-image"/>
                        <h3>Real-Time Price Comparison</h3>
                        <p>Compare prices across Amazon, Flipkart, and eBay to find the best deal.</p>
                    </div>
                    <div className="feature-item">
                        <img src={topImage} alt="Top Deals" className="feature-image"/>
                        <h3>Top 10 Best Deals</h3>
                        <p>See the top 10 options ranked by price and quality.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step-item">
                        <img src={searchImage} alt="Search Products" />
                        <h3>Search for a Product</h3>
                        <p>Enter the product name or category to start your search.</p>
                    </div>
                    <div className="step-item">
                        <img src={analysisImage} alt="Analyze Data" />
                        <h3>AI Analyzes Data</h3>
                        <p>Our AI fetches data from multiple sources and provides insights.</p>
                    </div>
                    <div className="step-item">
                        <img src={rankImage} alt="Find Best Deal" />
                        <h3>Find the Best Deal</h3>
                        <p>View the top-ranked products and compare prices instantly.</p>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <p>&copy; 2024 LICA. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <img src="https://img.icons8.com/fluent/48/000000/linkedin.png" alt="LinkedIn" />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
