// src/components/pages/FAQ.js
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Space-Sync?",
      answer: "Space-Sync is a parking management system designed to help users find and park their vehicles at the parking spaces easily."
    },{
      question: "How do I create an account?",
      answer: "To register on our platform, simply click Log In located in the main menu (top right on desktop or menu button in mobile). Then, select Create new account and enter your email address and password. It's that easy to get started!"
    },
    {
      question: "How do I rent a parking space?",
      answer: "You can rent a parking space by searching for available spots near your location and contacting the owner through our platform."
    },
    {
      question: "Is Space-Sync free to use?",
      answer: "Yes, Space-Sync is completely free to use. There are no hidden charges or fees."
    },
    {
      question: "Can I list my parking space on Space-Sync?",
      answer: "Absolutely! You can list your parking space on our platform by creating an account and posting your ad."
    },
    {
      question: "How can I manage my parking listings?",
      answer: "You can manage your listings through the admin dashboard, where you can add, edit, or remove parking spots."
    },
    {
      question: "What should I do if I encounter an issue?",
      answer: "If you encounter any issues, please contact our support team at support@space-sync.com or call +91 234 567 890."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      {questions.map((item, index) => (
        <div key={index} className="faq-item">
          <h2 className="faq-question" onClick={() => toggleAnswer(index)}>
            {item.question}
          </h2>
          {activeIndex === index && <p className="faq-answer">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
