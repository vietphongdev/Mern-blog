import React from 'react';
import { useRemoveDuplicateArray } from 'src/hooks/useInput';

export const Home = () => {
  const items = ['shoes', 'shirt', 'glass', 'shoes'];
  const prices = [10, 11, 122, 10, 8];

  const uniItems = useRemoveDuplicateArray(items);
  const uniPrices = useRemoveDuplicateArray(prices);

  return (
    <div
      style={{
        backgroundImage: `url("https://quizdeveloper.com/images/banner.jpg")`,
      }}
      className="bg-no-repeat bg-cover bg-orange-light"
    >
      <div className="over-banner">
        <div className="container-fuid">
          <div className="item-banner intro-text">
            <h1>Test programming skills online</h1>
            <p>
              QuizDev provides quiz, help you test your knowledge quickly, there are many levels for
              you to choose. This is also a place for sharing programming knowledge, interview
              questions for you reference and more you can ask questions, we and members will
              support for you.
            </p>
            <p>
              <i className="icon-right-open-1"></i> Take a quiz
            </p>
            <p>
              <i className="icon-right-open-1"></i> Make a Q&amp;A
            </p>
            <p>
              <i className="icon-right-open-1"></i> Share tips programming
            </p>
          </div>
          <div className="item-banner summary-box">
            <div className="item-summmary">
              <span>14</span>
              <p>Skills</p>
            </div>
            <div className="item-summmary">
              <span>113</span>
              <p>Skiller</p>
            </div>
            <div className="item-summmary">
              <span>6</span>
              <p>Practicles</p>
            </div>
            <div className="item-summmary">
              <span>92</span>
              <p>Total taken</p>
            </div>
            <div className="full-width pull-left text-center mg">
              <a href="/programming-skills" className="practicles">
                Take a quiz
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
