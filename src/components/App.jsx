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
    const storegeContacts = JSON.parse(
      localStorage.getItem(KEY_STOREGE_CONTACTS)
    );
    if (storegeContacts) {
      this.setState({
        contacts: storegeContacts,
      });
    }
  }

  componentDidUpdate(_, prevStates) {
    if (prevStates.contacts !== this.state.contacts) {
      localStorage.setItem(
        KEY_STOREGE_CONTACTS,
        JSON.stringify(this.state.contacts)
      );
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

  filteredContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.onSubmitForm} contacts={contacts} />
        {contacts.length > 0 && (
          <>
            <h2>Contacts</h2>
            <Filter filter={filter} changeFilter={this.changeFilter} />
            <ContactList
              contacts={this.filteredContacts()}
              removeContact={this.removeContact}
            />
          </>
        )}
      </section>
    );
  }
}
