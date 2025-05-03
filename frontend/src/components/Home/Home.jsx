import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowRight } from 'react-icons/bs';
import cycling from '../../assets/cycling.jpg';
import fitnessTrack from '../../assets/fitnesstrack.jpg';
import darkness from '../../assets/background.jpg';
import yogaMeditation from '../../assets/yoga.jpg';
import buildingBody from '../../assets/bodybuilding.jpg';
import fitnessFreak from '../../assets/fitnessfreak.jpg';
import gal1 from '../../assets/gal1.jpg';
import gal2 from '../../assets/gal2.jpg';
import gal3 from '../../assets/gal3.jpg';
import gal4 from '../../assets/gal4.jpg';
import weightLifting from '../../assets/weightlifting.jpg';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container ">
      <header className="home-header">
        <h1 style={{ color: 'white' }}>GymHut</h1>
        <p style={{ color: 'white' }}>Step up your fitness challenge with us</p>
        <button
          type="button"
          className="join_us_button"
          onClick={() => navigate("/login")}
        >
          <span>Join Us Now &nbsp;</span>
          <BsBoxArrowRight />
        </button>
      </header>
      <section className="home-cards">
        <div className="card">
          <h3>Modern Equipment</h3>
          <p>Our gym is equipped with the latest and most advanced fitness equipment to help you achieve your fitness goals.</p>
        </div>
        <div className="card">
          <h3>Professional Trainer</h3>
          <p>Our certified trainers are here to guide and motivate you through every step of your fitness journey.</p>
        </div>
        <div className="card">
          <h3>Healthy Diet Plan</h3>
          <p>We offer personalized diet plans to complement your workout routine and help you stay on track with your nutrition.</p>
        </div>
      </section>
      <section className="home-advertisement">
        <h2 style={{ color: 'white' }}>Discover Your Potential</h2>
        <p style={{ color: 'white' }}>Book your early seat to get winter 25% discount</p>
      </section>
      <section className="home-services">
        <h2 style={{ color: 'white' }}>Our Services</h2>
        <p style={{ color: 'white' }}>We offer group exercises, aerobic classes each week.</p>
        <div className="service-cards">
          <div className="service-card">
            <img src={cycling} alt="Cycling" />
            <h3>Cycling</h3>
            <p>Join our indoor cycling classes to improve your cardiovascular health and build lower body strength.</p>
          </div>
          <div className="service-card">
            <img src={fitnessTrack} alt="Fitness Track" />
            <h3>Fitness Track</h3>
            <p>Track your fitness progress with our state-of-the-art fitness tracking technology.</p>
          </div>
          <div className="service-card">
            <img src={weightLifting} alt="Weight Lifting" />
            <h3>Weight Lifting</h3>
            <p>Build muscle and increase strength with our comprehensive weight lifting programs.</p>
          </div>
          <div className="service-card">
            <img src={yogaMeditation} alt="Yoga Meditation" />
            <h3>Yoga Meditation</h3>
            <p>Relax and rejuvenate with our yoga and meditation classes designed to improve flexibility and reduce stress.</p>
          </div>
          <div className="service-card">
            <img src={buildingBody} alt="Building Body" />
            <h3>Building Body</h3>
            <p>Our body-building programs are tailored to help you achieve your muscle-building goals.</p>
          </div>
          <div className="service-card">
            <img src={fitnessFreak} alt="Fitness Freak" />
            <h3>Fitness Freak</h3>
            <p>Join our community of fitness enthusiasts and take your workouts to the next level.</p>
          </div>
        </div>
      </section>
      <section className="home-gallery">
        <h2 style={{ color: 'white' }}>Our Gallery</h2>
        <p style={{ color: 'white' }}>We offer group exercises, aerobic classes each week.</p>
        <div className="gallery-images">
          <img src={gal1} alt="Gallery Image 1" />
          <img src={gal2} alt="Gallery Image 2" />
          <img src={gal3} alt="Gallery Image 3" />
          <img src={gal4} alt="Gallery Image 4" />
        </div>
      </section>
      <section className="home-contact">
        <h2 style={{ color: 'white' }}>Contact Us</h2>
        <div style={{ color: 'white' }} className="contact-info">
          <div>
            <h3 style={{ color: 'white' }}>Location</h3>
            <p style={{ color: 'white' }}>Visakhapatnam.</p>
          </div>
          <div>
            <h3 style={{ color: 'white' }}>Phone</h3>
            <p style={{ color: 'white' }}>+91-8096230105.</p>
          </div>
          <div>
            <h3 style={{ color: 'white' }}>Email</h3>
            <p style={{ color: 'white' }}>support@GymHut.com</p>
          </div>
        </div>
      </section>
      <section className="home-subscribe">
        <h2 style={{ color: 'white' }}>Want to Know Something?</h2>
        <p style={{ color: 'white' }}>Get Started</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default Home;