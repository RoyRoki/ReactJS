import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setLoading } from '../features/slice/AuthSlice';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import NavBer from '../components/navComponents/NavBer';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authslice.user);
  console.log("home page ",user)
  const loading = useSelector((state) => state.authslice.loading);

  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedUser = await AuthService.getUser();
        if (fetchedUser) {
          dispatch(login(fetchedUser));
        } else {
          dispatch(logout());
          navigate('/login')
        }
      } catch (error) {
        dispatch(logout());
        navigate('/login')
      } finally {
        dispatch(setLoading(false));
      }
    };
    
    getUser();
  }, []);

  if (loading) return <LoadingPage />
  if(user === null) return;
  return (
    <>
      <NavBer  />
    </>
  )
};

export default Home;
