import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onBtnClick }) => (
  <ul className={css.contactList}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={css.contactList__item}>
        {name}: {number}
        <button
          name="delete"
          className={css.contactList__btn}
          onClick={() => onBtnClick(id)}
        >
          Delete contact
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
