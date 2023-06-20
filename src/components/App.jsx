import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');

    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));

      if (localStorage.getItem('contacts') === '[]') {
        localStorage.removeItem('contacts');
      }
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { name, number };
    newContact.id = nanoid();

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(contact => contact.id !== id),
    });
  };

  changeFilter = ({ currentTarget: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const { addContact, changeFilter, deleteContact } = this;

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <h1>Phone book</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter onFilterChange={changeFilter} />
        <ContactList contacts={filteredContacts} onBtnClick={deleteContact} />
      </>
    );
  }
}

export default App;
