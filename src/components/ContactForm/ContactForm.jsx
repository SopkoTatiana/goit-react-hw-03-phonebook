import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    this.props.addContact(name, number);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.onFormSubmit}>
        <label htmlFor="" className={css.form__item}>
          Name
          <input
            type="text"
            name="name"
            className={css.form__input}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleChange}
            required
          />
        </label>
        <label htmlFor="" className={css.form__item}>
          Number
          <input
            type="tel"
            name="number"
            className={css.form__input}
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit" className={css.form__btn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = { addContact: PropTypes.func.isRequired };

export default ContactForm;
