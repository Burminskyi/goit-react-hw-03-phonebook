import styles from './Filter.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const filterId = nanoid();

export const Filter = ({ value, onChange }) => {
  return (
    <div className={styles.filterWrap}>
      <label htmlFor={filterId} className={styles.filterLabel}>
        Find contacts by name
      </label>
      <input
        className={styles.filterInput}
        type="text"
        name="filter"
        value={value}
        id={filterId}
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
