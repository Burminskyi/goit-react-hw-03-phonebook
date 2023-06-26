import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <li className={styles.contactListItem} key={contact.id}>
          <p>
            {contact.name}: {contact.number}
          </p>
          <button
            type="button"
            className={styles.contactListBtn}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
