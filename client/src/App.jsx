import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const App = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [geoInfo, setGeoInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGeoInfo(ipAddress);
  };

  const fetchGeoInfo = async (ip) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setGeoInfo(response.data);
      setError(null);
    } catch (error) {
      setError('Invalid IP address');
      setGeoInfo(null);
    }
  };

  const handleClear = () => {
    setIpAddress('');
    setGeoInfo(null);
    setError(null);
  };

  return (
    <div>
      <h2>User's Info</h2>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label> Enter IP Address:</Form.Label>
            <Form.Control className='' type='text' value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Search
          </Button>
          <Button type='button' variant='secondary' onClick={handleClear}>
            Clear
          </Button>
        </Form>
        {error && <p>{error}</p>}
      </div>
      <div>
        <h3>User Geolocation Information</h3>
        <p>Ip: {geoInfo?.ip}</p>
        <p>City: {geoInfo?.city}</p>
        <p>Region: {geoInfo?.region}</p>
        <p>: {geoInfo?.country}</p>
      </div>
    </div>
  );
};

export default App;
