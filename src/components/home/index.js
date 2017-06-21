import React from 'react';
import {
  Link
} from 'react-router-dom'
const Home = () => (
  <div>
    <h2>Featured Images</h2>
    <ul>
      <li><Link to='/register'>register</Link></li>
      <li><Link to='/login'>login</Link></li>
    </ul>
  </div>
)

export default Home;
