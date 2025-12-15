import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import Coverage from '../../Coverage/Coverage';
import ServiceCard from '../../../pages/ServiceCard/ServiceCard';
import styled from 'styled-components';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const Home = () => {
  const [topServices, setTopServices] = useState([]);
  const [topDecorators, setTopDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, decoratorsRes] = await Promise.all([
          axios.get('https://xdecor.vercel.app/services'),
          axios.get('https://xdecor.vercel.app/decorators?status=approved')
        ]);

        setTopServices(servicesRes.data.slice(0, 4));
        setTopDecorators(decoratorsRes.data.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Top Services */}
      <TopServicesSection>
        <h2>Top Services</h2>
        <Grid>
          {topServices.map((service) => (
            <ServiceCardWrapper key={service._id}>
              <ServiceCard service={service} />
            </ServiceCardWrapper>
          ))}
        </Grid>
      </TopServicesSection>

      {/* Banner & Coverage */}
      <Banner />
      <Coverage />

      {/* Top Decorators */}
      <DecoratorsSection>
        <h2>Top Decorators</h2>
        <Grid>
          {topDecorators.map((decorator) => (
            <DecoratorCard key={decorator._id}>
              <Avatar
                src={decorator.photoURL || `https://i.pravatar.cc/150?u=${decorator._id}`}
                alt={decorator.name}
              />
              <Name>{decorator.name}</Name>
              <Specialty>{decorator.specialty || 'General Decorator'}</Specialty>
              <Rating>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < (decorator.rating || 4) ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
              </Rating>
            </DecoratorCard>
          ))}
        </Grid>
      </DecoratorsSection>
    </div>
  );
};

// Styled Components
const TopServicesSection = styled.section`
  padding: 50px 20px;
  background: #f8f9fa;
  text-align: center;

  h2 {
    font-size: 32px;
    margin-bottom: 40px;
    color: #333;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

const DecoratorsSection = styled.section`
  padding: 50px 20px;
  text-align: center;
  background: #fff;

  h2 {
    font-size: 32px;
    margin-bottom: 40px;
    color: #333;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

// Responsive grid: multi-column on desktop, 1 column on mobile
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  justify-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ServiceCardWrapper = styled.div`
  width: 100%;
  max-width: 260px;
  box-sizing: border-box;
`;

const DecoratorCard = styled.div`
  width: 100%;
  max-width: 220px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border-radius: 16px;
  padding: 20px 15px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.3);
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  margin: 10px 0 5px;
  font-size: 18px;

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const Specialty = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  background: rgba(255,255,255,0.2);
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;

  @media (max-width: 400px) {
    font-size: 12px;
    padding: 3px 6px;
  }
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  font-size: 14px;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export default Home;
