import React, { useContext,useEffect,useRef,useState } from 'react';
import { ResidenceContext } from '../contexts/ResidenceContextProvider';
import ResidenceList from '../components/ResidenceList'
import '../style/Residences.css';

const Residences = (props) => {

  const category = props.location.country;
  const { residences,fetchResidences } = useContext(ResidenceContext);
  const [filteredList, setFilteredList] = useState(null);
  const [showSearchFields, setShowSearchFields] = useState(false);


  const country = useRef('');
  const city = useRef('');


  const searchFor = (e) => {
    e.preventDefault();

    if (!city.current.value && !country.current.value) { 
      setFilteredList([...residences]);
      return;
    }

    if (city.current.value !== '' && country.current.value !== '') {
      const filter = residences.filter(r => r.country.toUpperCase() === country.current.value.toUpperCase() &&
      r.city.toUpperCase() === city.current.value.toUpperCase());
      setFilteredList([...filter]);
    }
    else if (country.current.value !== '' && city.current.value === '') {
      const filter = residences.filter(r => r.country.toUpperCase() === country.current.value.toUpperCase());
      setFilteredList([...filter]);
    }
    else if (country.current.value === '' && city.current.value !== '') {
      const filter = residences.filter(r => r.city.toUpperCase() === city.current.value.toUpperCase());
      setFilteredList([...filter]);
    }

  }

  useEffect(() => {
    fetchResidences().then(r => {
    if (category) {
      const filter = residences.filter(r => r.country === category);
      setFilteredList([...filter]);
    } else {
      setFilteredList([...r]);
    }
    });
  },[])
  
 

  return (  
    <div className="residences">
      {!showSearchFields && <span onClick={() => setShowSearchFields(true)}>🔍</span>}
      {showSearchFields && <div className="searchFields">
        <form onSubmit={searchFor}>
          <input ref={country} type="text" placeholder="Search by country.." />
          <input ref={city} type="text" placeholder="Search by city.." />
          <button>Search</button>
        </form>
      </div>}
      {filteredList && <ResidenceList residences={filteredList} />}
    </div>
  );
}
 
export default Residences;