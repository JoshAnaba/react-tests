
import { render, screen} from '@testing-library/react'
import UserList from '../../src/components/UserList'
import { User } from '../../src/entities'
describe('UserList', () => {
  it("should render 'no user text' if no users", () => {
    render(<UserList users={[]} />)
    expect(screen.getByText(/no users/i)).toBeInTheDocument()
  })
  it("should render a list of users", () => {
    const users:User[] = [
      {id: 1, name: "user1"},
      {id: 2, name: "user2"},
      {id: 3, name: "user3"},
    ]
    render(<UserList users={users} />)
    users.forEach(user => {
     const link = screen.getByRole('link', {name: user.name})
     expect(link).toBeInTheDocument()
     expect(link).toHaveAttribute('href', `/users/${user.id}`)
    })
  })
})