import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './ContactList/Filter/Filter';

const KEY_STOREGE_CONTACTS = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const getLocalContacts = JSON.parse(
        localStorage.getItem(KEY_STOREGE_CONTACTS)
      );
      this.setState({ contacts: getLocalContacts });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidUpdate(_, prevStates) {
    if (prevStates.contacts !== this.state.contacts) {
      try {
        localStorage.setItem(
          KEY_STOREGE_CONTACTS,
          JSON.stringify(this.state.contacts)
        );
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  onSubmitForm = contacts => {
    this.setState({ contacts: [contacts, ...this.state.contacts] });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  removeContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.onSubmitForm} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={this.changeFilter} />
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            removeContact={this.removeContact}
          />
        )}
      </section>
    );
  }
}
