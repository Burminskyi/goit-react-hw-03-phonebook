import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const psrsedContacts = JSON.parse(contacts);

    if (psrsedContacts) {
      this.setState({ contacts: psrsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    this.setState(prev => ({
      contacts: [...prev.contacts, { ...data, id: nanoid() }],
    }));
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filtredContacts = this.getFilteredContacts();
    const { contacts, filter } = this.state;

    return (
      <div
        style={{
          width: '300px',
          padding: '15px',
          margin: 'auto',
          alignContent: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {filtredContacts.length > 0 && (
          <ContactList
            contacts={filtredContacts}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}
