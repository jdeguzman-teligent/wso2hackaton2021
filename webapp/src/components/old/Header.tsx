import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Extricity Billing</span> System
      </h1>
      <p className={headerStyles.description}>
        Customers List
      </p>
    </div>
  )
}

export default Header
