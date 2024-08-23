import styles from './Footersign.module.css';
import { Link } from 'react-router-dom';

const Footersign = () => {
  return (
    <div className={styles.foot}>
      <p>
        Already have an account? 
        <Link to="/" className={styles.loginAccountLink}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Footersign;

/*
 <div className={styles.accept}>
        
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          Accept the terms and conditions
        </label>
      </div>
*/