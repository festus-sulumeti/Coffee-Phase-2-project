import React from 'react';

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to Walisa Coffee Shop, where we take pride in serving the finest coffee
          in town. Our passion for coffee drives us to source the best beans from around
          the world and craft unique coffee experiences for our customers.
        </p>
        <p>
          Our expert baristas are dedicated to delivering the perfect cup of coffee
          every time. We offer a wide range of coffee blends, from rich and bold to
          smooth and aromatic, catering to all coffee lovers.
        </p>
        <p>
          At Walisa Coffee Shop, we believe that a great cup of coffee is an art form,
          and we invite you to savor the flavors of our world-class coffee and enjoy
          the cozy ambiance of our café.
        </p>
      </div>
      <div className="about-image">
        <img
          src="https://cdn.homedit.com/wp-content/uploads/2019/05/A-Modern-Colombian-Coffee-Shop-2-1024x667.jpg"
          alt="Coffee interior"
        />
      </div>
    </section>
  );
}

export default AboutSection;
