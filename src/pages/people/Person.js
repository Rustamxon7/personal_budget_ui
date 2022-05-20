import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPerson } from '../../redux/people/loadPerson';
import NavBar from '../../components/NavBar';

const PersonInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchPerson(location.pathname.split('/')[2]));
  }, [dispatch, location]);

  const person = useSelector((state) => state.persons.people);

  return (
    <div className="app">
      {person ? (
        <>
          <main>
            <NavBar name={person.name} id={person.id} />
            <section className="section-dashboard">
              <div className="container">
                <div className="dashboard">dsf</div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <p>No person found</p>
      )}
    </div>
  );
};

export default PersonInfo;
