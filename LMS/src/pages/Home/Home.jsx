import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Learn Without Limits</h1>
          <p>Best LMS platform for students, teachers, and institutions</p>
          <Link to="/signup" className="btn-primary hero-btn">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Quality Courses</h3>
            <p>Access to hundreds of courses across multiple subjects</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Expert Teachers</h3>
            <p>Learn from qualified and experienced instructors</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your learning with detailed analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Assignments & Quizzes</h3>
            <p>Test your knowledge with interactive assessments</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Certificates</h3>
            <p>Earn certificates on course completion</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Get help anytime from our support team</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning with us</p>
          <Link to="/signup" className="btn-primary">Sign Up Free</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;