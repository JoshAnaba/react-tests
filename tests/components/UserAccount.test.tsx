
import { render, screen} from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'
import { User } from '../../src/entities'

describe('UserAccount', () => {
  const renderComponent = (user:User) => {
    render(<UserAccount user={user} />)
    return {
      button: screen.queryByRole('button')
    }}
  it('should render user name', () => {
    const user:User = {name: 'John', isAdmin: true, id: 1}
    renderComponent(user)
    expect(screen.getByText(user.name)).toBeInTheDocument()
  })
  it('should render edit button if user is admin', () => {
    const user:User = {name: 'John', isAdmin: true, id: 1}
    const {button} = renderComponent(user)
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/edit/i)
  })
  it('should not render edit button if user is not admin', () => {
    const user:User = {name: 'John', id: 1}
    const {button} = renderComponent(user)
    expect(button).not.toBeInTheDocument()
  })
})