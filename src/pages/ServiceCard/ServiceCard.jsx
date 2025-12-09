import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const ServiceCard = ({ service }) => {
  const { image, serviceName, description, price, _id, serviceType } = service;

  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {/* Back side */}
          <div className="back">
            <div className="back-content">
              <strong>{serviceType || "Service"}</strong>
              <Link to={`/services/${_id}`}>
                <button className="view-btn">View Details</button>
              </Link>
            </div>
          </div>

          {/* Front side */}
          <div className="front">
            <div className="img">
              <img src={image} alt={serviceName} />
            </div>
            <div className="front-content">
              <div className="description">
                <div className="title">
                  <p>
                    <strong>{serviceName}</strong>
                  </p>
                  <span className="price">${price}</span>
                </div>
                <p className="card-footer">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 260px;
    height: 320px;
    margin: auto;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 400ms;
    box-shadow: 0px 0px 10px 2px #00000066;
    border-radius: 10px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    backface-visibility: hidden;
    overflow: hidden;
  }

  .front {
    transform: rotateY(0deg);
    background-color: #111;
    color: #fff;
  }

  .back {
    transform: rotateY(180deg);
    background-color: #151515;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back::before {
    content: "";
    position: absolute;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #6366f1,
      #8b5cf6,
      #ec4899,
      transparent
    );
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .back-content {
    position: absolute;
    width: 95%;
    height: 95%;
    background-color: #151515;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    z-index: 2;
  }

  .view-btn {
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .view-btn:hover {
    transform: scale(1.05);
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
  }

  .front-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .title {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }

  .price {
    font-weight: 600;
    color: #20c997;
  }

  .card-footer {
    font-size: 12px;
    color: #ddd;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    .card {
      width: 90%;
      height: 280px;
    }
  }
`;

export default ServiceCard;
