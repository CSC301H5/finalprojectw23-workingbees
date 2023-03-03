import { useNavigate } from 'react-router-dom';

export const UseCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/LoginHomePage');
  };

  return {
    navigateToHomePage,
  };
};