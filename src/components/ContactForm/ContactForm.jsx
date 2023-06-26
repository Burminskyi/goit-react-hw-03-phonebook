import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const isInContacts = this.props.contacts.some(
      contacts => contacts.name.toLowerCase() === this.state.name.toLowerCase()
    );

    if (isInContacts) {
      alert('This contact is already exist');
      return;
    }

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={styles.phoneForm}
        name="signup_form"
        autoComplete="on"
      >
        <div className={styles.phoneFormWrap}>
          <label htmlFor={this.nameInputId} className={styles.contactFormLabel}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            className={styles.contactFormInput}
            id={this.nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <label
            htmlFor={this.numberInputId}
            className={styles.contactFormLabel}
          >
            Number
          </label>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={styles.contactFormInput}
            id={this.numberInputId}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit" className={styles.phoneFormBtn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
