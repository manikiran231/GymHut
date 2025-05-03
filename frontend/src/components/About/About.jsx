import React from 'react';
import './About.css';

function About() {
  return (
    <div className="aboutus-container">
      <header>
        <h1 className='mani'>About Us</h1>
      </header>
      <section>
        <p>
          Welcome to FitLife Gym! We are dedicated to helping you achieve your fitness goals through a variety of classes and personalized training programs. Our experienced trainers and state-of-the-art facilities provide the perfect environment for you to stay motivated and reach your full potential.
        </p>
        <p>
          At FitLife Gym, we believe in a holistic approach to fitness, focusing on both physical and mental well-being. Join us today and become a part of our fitness community!
        </p>
      </section>
      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to inspire and empower individuals to lead healthier lives by providing exceptional fitness services and fostering a supportive community.
        </p>
      </section>
      <section>
        <h2>Our Goals</h2>
        <ul>
          <li>Offer a diverse range of fitness programs to cater to all fitness levels.</li>
          <li>Continuously improve our facilities and equipment to ensure a top-notch experience.</li>
          <li>Build a community where members support and motivate each other.</li>
        </ul>
      </section>
      <section>
        <h2>Our Priorities</h2>
        <ul>
          <li>Member satisfaction and safety.</li>
          <li>Maintaining a clean and welcoming environment.</li>
          <li>Providing ongoing education and training for our staff.</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
